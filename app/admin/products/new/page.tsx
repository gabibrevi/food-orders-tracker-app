import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'

export default async function CreateProductPage() {
    return (
        <>
            <Heading>Create a new product for your shop</Heading>

            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    )
}
