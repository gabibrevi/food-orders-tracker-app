'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import { getImagePath } from '@/src/lib/utils'
import { object } from 'zod'

type ImageUploadProps = {
    image?: string
}
export default function ImageUpload({ image }: ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset='ml_default'
            options={{ maxFiles: 1 }}>
            {({ open }) => (
                <>
                    <div className=' space-y-2'>
                        <label className=' text-slate-800'>Image</label>
                        <div
                            className=' relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300
                      flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 '
                            onClick={() => open()}>
                            <TbPhotoPlus size={50} />
                            <p className=' text-lg font-semibold'>Add image</p>

                            {imageUrl && (
                                <div className='absoule inset-0 w-full h-full'>
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt='Product image'></Image>
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className=' space-y-2'>
                            <label>Current image</label>
                            <div className=' relative w-64 h-64  '>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt='product image'
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    )}
                    <input type='hidden' defaultValue={imageUrl ? imageUrl : image} name='image' />
                </>
            )}
        </CldUploadWidget>
    )
}
