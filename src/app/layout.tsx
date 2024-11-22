import { SITE_NAME } from '@/constants/seo.constatns'
import './globals.scss'
import type { Metadata } from 'next'
import {Noto_Sans } from 'next/font/google'
import { Providers } from './providers'
import {Toaster} from 'sonner'

const zen = Noto_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-zen',
  style: ['normal']
})

export const metadata: Metadata = {
 title : {
  default: SITE_NAME,
  template: `%s | ${SITE_NAME}`
 },
 description: 'Best one for planning from roga_k1ng'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={zen.className}>
          <Providers>
            {children} 

            <Toaster
              theme='dark'
              position='bottom-right'
              duration={1500}
            />
          </Providers>
        </body>
    </html>
  )
}
