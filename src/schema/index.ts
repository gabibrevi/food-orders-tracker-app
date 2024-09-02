import { z } from 'zod'

export const OrderSchema = z.object({
    name: z.string().min(1, 'Dont forget your name!'),
    total: z.number().min(1, 'Create your order!'),
    order: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
            subtotal: z.number(),
        })
    ),
})

export const OrderIdSchema = z.object({
    order_id: z
        .string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'Order ID missing' }),
})

export const SearchFormSchema = z.object({
    search: z.string().trim().min(1, { message: 'Type something' }),
})

export const ProductSchema = z.object({
    name: z.string().trim().min(1, { message: 'Product name is missing' }),
    price: z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Price can not be 0' }),
    categoryId: z
        .string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'Category is missing' }),
    image: z.string().min(1, { message: 'Image is missing' }),
})
