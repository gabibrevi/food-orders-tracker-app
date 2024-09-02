import { formatCurrency, getImagePath } from '@/src/lib/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import AddProductButton from './AddProductButton'

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const imageUrl = getImagePath(product.image)
    return (
        <div className=' border bg-white '>
            <Image width='400' height='500' src={imageUrl} alt={`${product.name}'s image`} quality={80} />
            <div className='p-5'>
                <h3 className=' text-2xl font-bold'>{product.name}</h3>
                <p className=' text-4xl mt-5 font-black text-amber-500'>{formatCurrency(product.price)}</p>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}
