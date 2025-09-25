"use client"
import { Button } from "./ui/button"

interface UserSwitcherProps {
  currentUser: string
  onUserChange: (user: string) => void
}

export function UserSwitcher({ currentUser, onUserChange }: UserSwitcherProps) {
  const users = ["Maged", "Alyana"]
  const otherUser = users.find((user) => user !== currentUser) || "Maged"

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Signed in as:</span>
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-primary">{currentUser}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUserChange(otherUser)}
          className="text-xs px-2 py-1 h-auto border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          Switch to {otherUser}
        </Button>
      </div>
    </div>
  )
}
