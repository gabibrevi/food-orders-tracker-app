import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Kiosko-App',
    description: 'Kiosko developed with Next.js, AppRouter, Prisma and Zod',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} bg-gray-100`}>{children}</body>
        </html>
    )
}
