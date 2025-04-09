"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "./ui/label"

export default function ToggleAcceptMessages() {
    return (
        <div className="flex items-center space-x-2">
            <Switch id="accept-message" />
            <Label htmlFor="accept-message">Accept Messages</Label>
        </div>
    )
}
