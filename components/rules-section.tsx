export function RulesSection() {
  const rules = [
    {
      title: "The Daily Covenant",
      description: "Each soul may inscribe but one letter per day upon the eternal parchment.",
      details:
        "This sacred limitation ensures that every word carries weight and meaning, preventing the dilution of your spiritual connection.",
    },
    {
      title: "The Shared Vision",
      description: "All letters written become visible to both souls, creating a shared tapestry of thoughts.",
      details:
        "There are no secrets in this realm - every word you write becomes part of the collective consciousness you share.",
    },
    {
      title: "The Weekly Cycles",
      description: "Letters are bound together in weekly cycles, each forming a chapter in your eternal story.",
      details: "Time flows in sacred patterns, with each week representing a complete cycle of spiritual exchange.",
    },
    {
      title: "The Silence of Response",
      description: "No direct replies or comments may be made within this sacred space.",
      details:
        "The power lies in the letters themselves - responses must come through new letters or discussions beyond this realm.",
    },
    {
      title: "The Weekly Selection",
      description: "At each week's end, each soul may choose one letter to carry forth for external contemplation.",
      details:
        "This selection represents the most meaningful exchange of the week, worthy of deeper discussion in the physical realm.",
    },
    {
      title: "The Flame Pass Blessing",
      description: "Should no letter be chosen, the Eternal Flame grants a Flame Pass, valid for seven days.",
      details:
        "This blessing allows you to make an additional selection in a future week, but the flame's gift expires if unused.",
    },
  ]

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="gothic-title text-3xl text-primary mb-4">The Sacred Rules</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          These immutable laws govern the exchange of souls through written word, established by the ancient keepers of
          the Eternal Flame.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {rules.map((rule, index) => (
          <div key={index} className="parchment torn-edges p-6 md:p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="gothic-title text-accent-foreground font-bold">{index + 1}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="gothic-title text-xl text-accent mb-2">{rule.title}</h3>
                <p className="handwritten text-lg mb-3 text-balance">{rule.description}</p>
                <p className="text-sm text-muted-foreground/80 italic">{rule.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="parchment p-6 bg-ember/5 border border-ember/30">
        <div className="text-center">
          <div className="ember-glow text-3xl mb-3">🔥</div>
          <h3 className="gothic-title text-xl text-ember mb-2">Remember, Keeper of Letters</h3>
          <p className="text-muted-foreground italic">
            These rules are not mere guidelines, but the very foundation upon which the Eternal Letters exist. To break
            them is to risk severing the mystical connection that binds your souls across the ethereal plane.
          </p>
        </div>
      </div>
    </section>
  )
}
