import { Navigation } from "@/components/navigation"
import { LoreSection } from "@/components/lore-section"
import { AuthGuard } from "@/components/auth-guard"
import BonfireLoader from "@/components/glowingFlameLoader"

// Dummy flame passes for navigation
const dummyFlamePasses = [
  {
    id: "fp1",
    issuedDate: "2024-01-21T00:00:00Z",
    expiryDate: "2024-01-28T23:59:59Z",
    isUsed: false,
    weekEarned: 1,
  },
]

export default function LorePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation flamePasses={dummyFlamePasses} />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="gothic-title text-4xl md:text-6xl text-primary mb-4 rune-glow">Ancient Lore</h1>
            <p className="text-muted-foreground text-lg">The ancient wisdom and mysteries of the eternal realm</p>
          </div>

          <div className="space-y-8">
            <BonfireLoader />
            <LoreSection />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
