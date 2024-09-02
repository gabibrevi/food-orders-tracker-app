import ProductsTable from '@/components/admin/ProductsTable'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function searchProduct(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        },
        include: {
            category: true,
        },
    })

    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const products = await searchProduct(searchParams.search)

    return (
        <>
            <Heading>Searching for: {searchParams.search}</Heading>
            <div className=' flex flex-row gap-5 lg:flex-row lg:justify-end'>
                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductsTable products={products} />
            ) : (
                <p className=' text-center text-lg font-bold'>No results for {searchParams.search}</p>
            )}
        </>
    )
}
