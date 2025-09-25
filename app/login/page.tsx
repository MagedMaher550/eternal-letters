"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState<"maged" | "alyana" | null>(null)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = () => {
    if (!selectedUser) {
      setError("Please select a user")
      return
    }

    // Simple password check (in real app, this would be proper authentication)
    const correctPassword = selectedUser === "maged" ? "eternal2024" : "letters2024"

    if (password !== correctPassword) {
      setError("Incorrect password")
      return
    }

    login(selectedUser)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Flame className="h-12 w-12 text-accent" />
          </div>
          <CardTitle className="text-2xl font-serif text-foreground">Eternal Letters</CardTitle>
          <CardDescription className="text-muted-foreground">Enter the sacred correspondence chamber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-sm font-medium text-foreground mb-2">Select Your Identity</div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedUser === "maged" ? "default" : "outline"}
                onClick={() => setSelectedUser("maged")}
                className="h-16 flex flex-col gap-1"
              >
                <span className="font-serif text-lg">Maged</span>
                <span className="text-xs opacity-70">The Chronicler</span>
              </Button>
              <Button
                variant={selectedUser === "alyana" ? "default" : "outline"}
                onClick={() => setSelectedUser("alyana")}
                className="h-16 flex flex-col gap-1"
              >
                <span className="font-serif text-lg">Alyana</span>
                <span className="text-xs opacity-70">The Keeper</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sacred Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-background/50"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            {selectedUser && (
              <p className="text-xs text-muted-foreground">
                Hint: {selectedUser === "maged" ? "eternal2024" : "letters2024"}
              </p>
            )}
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

          <Button onClick={handleLogin} className="w-full" disabled={!selectedUser || !password}>
            Enter the Chamber
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
