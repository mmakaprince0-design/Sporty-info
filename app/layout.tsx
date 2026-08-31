import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: { default: 'Sporty Info — World of Champions', template: '%s | Sporty Info' }, description: 'Global football news, live scores and match previews from Sporty Info.', generator: 'Sporty Info', openGraph: { title: 'Sporty Info — World of Champions', description: 'Sharp football news, live scores and the stories behind the world’s biggest matches.', type: 'website' } }
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#0a0f1e', width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
