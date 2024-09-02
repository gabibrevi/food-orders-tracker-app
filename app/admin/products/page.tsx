import ProductsTable from '@/components/admin/ProductsTable'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductsPagination from '@/components/products/ProductsPagination'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function productsCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
    const pageSkip = (page - 1) * pageSize

    const products = await prisma.product.findMany({
        take: pageSize,
        skip: pageSkip,
        include: {
            category: true,
        },
    })
    return products
}

export default async function ProductPage({ searchParams }: { searchParams: { page: string } }) {
    const page = +searchParams.page || 1
    const pageSize = 10

    if (page < 1) redirect('/admin/products')

    const [products, totalProducts] = await Promise.all([getProducts(page, pageSize), productsCount()])
    const totalPages = Math.ceil(totalProducts / pageSize)

    if (page > totalPages) redirect('/admin/products?page=1')

    return (
        <>
            <Heading>Product List</Heading>

            <div className=' flex flex-col gap-5 lg:flex-row lg:justify-between'>
                <Link
                    href={'/admin/products/new'}
                    className=' bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 font-bold text-center cursor-pointer '>
                    New Product
                </Link>

                <ProductSearchForm />
            </div>

            <ProductsTable products={products} />

            <ProductsPagination totalPages={totalPages} page={page}></ProductsPagination>
        </>
    )
}
