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
  openGraph: {
    title: 'Eco Quiz - Environmental Awareness',
    description: 'Test your environmental awareness with our interactive quiz. Pay 0.1 CELO to unlock your eco score!',
    images: ['https://ecoquiz-henna.vercel.app/icon.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify({
      version: "1",
      imageUrl: "https://ecoquiz-henna.vercel.app/icon.png",
      button: {
        title: "Open EcoQuiz",
        action: {
          type: "launch_frame",
          name: "EcoQuiz",
          url: "https://ecoquiz-henna.vercel.app",
          splashImageUrl: "https://ecoquiz-henna.vercel.app/splash.png",
          splashBackgroundColor: "#2E7D32"
        }
      }
    })
  }
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
