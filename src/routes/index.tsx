import { createFileRoute } from '@tanstack/react-router'
import { Hero, Features, Gallery, Footer } from '@/components/landing'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <>
      <div className="noise-overlay" />
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen bg-[#050505]">
        <Hero />
        <Features />
        <Gallery />
        <Footer />
      </main>
    </>
  )
}
