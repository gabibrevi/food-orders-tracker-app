import { completeOrder } from '@/actions/complete-order-action'
import { formatCurrency } from '@/src/lib/utils'
import { OrderWithProducts } from '@/src/types'

type OrderCardProps = {
    order: OrderWithProducts
}
export default function OrderCard({ order }: OrderCardProps) {
    return (
        <section
            aria-labelledby='summary-heading'
            className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4'>
            <p className='text-2xl font-medium text-gray-900'>Client: {order.name} </p>
            <p className='text-lg font-medium text-gray-900'>Order:</p>
            <dl className='mt-6 space-y-4'>
                {order.orderProducts.map((product) => (
                    <div key={product.id} className=' flex items-center gap-2 border-t border-gray-200 pt-4 '>
                        <dt className=' flex items-center text-sm text-gray-600'>
                            <span className=' font-black'>
                                ({product.quantity}) {''}
                            </span>
                        </dt>
                        <dd className=' text-gray-800 font-medium text-sm'>{product.product.name}</dd>
                    </div>
                ))}
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <dt className='text-base font-medium text-gray-900'>Total: {formatCurrency(order.total)}</dt>
                    <dd className='text-base font-medium text-gray-900'>{}</dd>
                </div>
            </dl>

            <form action={completeOrder}>
                <input hidden readOnly value={order.id} name='order_id'></input>
                <input
                    type='submit'
                    className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
                    value='Finish order'
                />
            </form>
        </section>
    )
}
