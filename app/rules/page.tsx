import { Navigation } from "@/components/navigation"
import { RulesSection } from "@/components/rules-section"
import { AuthGuard } from "@/components/auth-guard"

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

export default function RulesPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation flamePasses={dummyFlamePasses} />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="gothic-title text-4xl md:text-6xl text-primary mb-4 rune-glow">Sacred Rules</h1>
            <p className="text-muted-foreground text-lg">The sacred laws governing Eternal Letters</p>
          </div>

          <div className="space-y-8">
            <RulesSection />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
