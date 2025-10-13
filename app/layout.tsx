import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { WagmiProviderWrapper } from '@/components/wagmi-provider'
import { FarcasterProvider } from '@/components/farcaster-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eco Quiz - Environmental Awareness',
  description: 'Test your environmental awareness with our interactive quiz. Pay 0.1 CELO to unlock your eco score!',
  generator: 'Eco Quiz App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <FarcasterProvider>
          <WagmiProviderWrapper>
            {children}
          </WagmiProviderWrapper>
        </FarcasterProvider>
        <Analytics />
      </body>
    </html>
  )
}
