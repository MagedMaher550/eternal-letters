"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface FlamePass {
  id: string
  issuedDate: string
  expiryDate: string
  isUsed: boolean
  weekEarned: number
}

interface FlamePassIndicatorProps {
  flamePasses: FlamePass[]
  onUseFlamePass?: (flamePassId: string) => void
  canUseFlamePass?: boolean
}

export function FlamePassIndicator({ flamePasses, onUseFlamePass, canUseFlamePass = false }: FlamePassIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false)

  const activeFlamePass = flamePasses.find((pass) => !pass.isUsed && new Date(pass.expiryDate) > new Date())
  const expiredPasses = flamePasses.filter((pass) => !pass.isUsed && new Date(pass.expiryDate) <= new Date())
  const usedPasses = flamePasses.filter((pass) => pass.isUsed)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  if (flamePasses.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
        {activeFlamePass && (
          <>
            <div className="ember-glow text-xl animate-pulse">🔥</div>
            <span className="text-sm font-medium text-ember">{getDaysUntilExpiry(activeFlamePass.expiryDate)}d</span>
          </>
        )}
        {expiredPasses.length > 0 && (
          <div className="text-muted-foreground text-sm">({expiredPasses.length} expired)</div>
        )}
      </div>

      {showDetails && (
        <div className="absolute top-full right-0 mt-2 w-80 parchment p-4 border border-accent rounded-lg shadow-lg z-50">
          <h3 className="gothic-title text-lg text-accent mb-3">Flame Passes</h3>

          {activeFlamePass && (
            <div className="mb-4 p-3 bg-ember/10 rounded border border-ember/30">
              <div className="flex items-center justify-between mb-2">
                <span className="ember-glow font-medium">Active Pass</span>
                <span className="text-sm text-muted-foreground">Expires {formatDate(activeFlamePass.expiryDate)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Earned from Week {activeFlamePass.weekEarned} • {getDaysUntilExpiry(activeFlamePass.expiryDate)} days
                remaining
              </p>
              {canUseFlamePass && (
                <Button
                  size="sm"
                  onClick={() => onUseFlamePass?.(activeFlamePass.id)}
                  className="bg-ember hover:bg-ember/80 text-white gothic-title"
                >
                  Use Flame Pass
                </Button>
              )}
            </div>
          )}

          {expiredPasses.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Expired</h4>
              {expiredPasses.map((pass) => (
                <div key={pass.id} className="text-sm text-muted-foreground/60 mb-1">
                  Week {pass.weekEarned} pass • Expired {formatDate(pass.expiryDate)}
                </div>
              ))}
            </div>
          )}

          {usedPasses.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Used</h4>
              {usedPasses.map((pass) => (
                <div key={pass.id} className="text-sm text-muted-foreground/60 mb-1">
                  Week {pass.weekEarned} pass • Used
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-accent/30">
            <p className="text-xs text-muted-foreground italic">
              Flame Passes allow you to select an extra letter when no weekly selection was made.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
