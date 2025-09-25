interface FlamePass {
  id: string
  issuedDate: string
  expiryDate: string
  isUsed: boolean
  weekEarned: number
}

interface FlamePassHistoryProps {
  flamePasses: FlamePass[]
}

export function FlamePassHistory({ flamePasses }: FlamePassHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatus = (pass: FlamePass) => {
    if (pass.isUsed) return { text: "Used", color: "text-muted-foreground" }
    if (new Date(pass.expiryDate) <= new Date()) return { text: "Expired", color: "text-destructive" }
    return { text: "Active", color: "text-ember ember-glow" }
  }

  const getDaysRemaining = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  if (flamePasses.length === 0) {
    return (
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="gothic-title text-3xl text-primary mb-4">Flame Pass Chronicle</h2>
          <p className="text-muted-foreground text-lg">Your history with the Eternal Flame's blessings</p>
        </div>

        <div className="parchment p-8 text-center">
          <div className="text-4xl mb-4">🔥</div>
          <h3 className="gothic-title text-xl text-accent mb-2">No Flame Passes Yet</h3>
          <p className="text-muted-foreground">
            Complete a week without selecting a letter to earn your first Flame Pass blessing.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="gothic-title text-3xl text-primary mb-4">Flame Pass Chronicle</h2>
        <p className="text-muted-foreground text-lg">Your history with the Eternal Flame's blessings</p>
      </div>

      <div className="space-y-4">
        {flamePasses.map((pass) => {
          const status = getStatus(pass)
          const isActive = status.text === "Active"

          return (
            <div key={pass.id} className={`parchment p-6 ${isActive ? "bg-ember/5 border border-ember/30" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl ${isActive ? "ember-glow animate-pulse" : ""}`}>🔥</div>
                  <div>
                    <h3 className="gothic-title text-lg text-accent">Week {pass.weekEarned} Flame Pass</h3>
                    <p className="text-sm text-muted-foreground">Issued: {formatDate(pass.issuedDate)}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-medium ${status.color}`}>{status.text}</div>
                  {isActive && (
                    <p className="text-sm text-muted-foreground">{getDaysRemaining(pass.expiryDate)} days left</p>
                  )}
                  {status.text === "Expired" && (
                    <p className="text-sm text-muted-foreground">Expired: {formatDate(pass.expiryDate)}</p>
                  )}
                </div>
              </div>

              {isActive && (
                <div className="mt-4 pt-4 border-t border-ember/30">
                  <p className="text-sm text-muted-foreground italic">
                    This blessing allows you to select an additional letter from any completed week.
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="parchment p-6 bg-primary/5 border border-primary/30">
        <div className="text-center">
          <div className="rune-glow text-2xl mb-3">✨</div>
          <h3 className="gothic-title text-lg text-primary mb-2">The Flame's Wisdom</h3>
          <p className="text-sm text-muted-foreground italic">
            Each Flame Pass represents a moment of restraint and wisdom. The Eternal Flame rewards those who understand
            that sometimes the greatest power lies in choosing not to choose, allowing the mystical energies to flow
            freely through the cosmos.
          </p>
        </div>
      </div>
    </section>
  )
}
