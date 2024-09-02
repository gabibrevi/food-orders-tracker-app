'use client'

import { Product } from '@prisma/client'
import { useStore } from '@/src/store'
import { useMemo } from 'react'

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <button
            onClick={() => addToOrder(product)}
            type='button'
            className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'>
            Add to order
        </button>
    )
}
