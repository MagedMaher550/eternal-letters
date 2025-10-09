"use client"

import { useSettings as useSettingsContext } from "@/contexts/settings-context"

export function useSettings() {
    return useSettingsContext()
}

export type { Settings } from "@/contexts/settings-context"
