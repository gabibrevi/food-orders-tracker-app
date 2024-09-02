'use server'

import { prisma } from '@/src/lib/prisma'
import { ProductSchema } from '@/src/schema'
import { revalidatePath } from 'next/cache'

export async function updateProduct(data: unknown, id: number) {
    const result = ProductSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues,
        }
    }

    try {
        await prisma.product.update({
            where: {
                id: id,
            },
            data: result.data,
        })
        revalidatePath('/admin/products')
    } catch (error) {
        console.log(error)
    }
}
