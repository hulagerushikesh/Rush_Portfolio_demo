import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rushikesh Hulage - Software Engineer & AI/ML Specialist',
  description: 'Software Engineer at Telstra specializing in AI/ML, Backend Development, and Cloud Architecture. Explore my projects, blog posts, and professional journey.',
  keywords: 'Rushikesh Hulage, Software Engineer, AI/ML, Machine Learning, Backend Development, AWS, GCP, Python, Java, Portfolio',
  authors: [{ name: 'Rushikesh Hulage' }],
  creator: 'Rushikesh Hulage',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rushikeshhulage.dev',
    title: 'Rushikesh Hulage - Software Engineer & AI/ML Specialist',
    description: 'Software Engineer at Telstra specializing in AI/ML, Backend Development, and Cloud Architecture.',
    siteName: 'Rushikesh Hulage Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushikesh Hulage - Software Engineer & AI/ML Specialist',
    description: 'Software Engineer at Telstra specializing in AI/ML, Backend Development, and Cloud Architecture.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
