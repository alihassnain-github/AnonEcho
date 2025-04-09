"use client"

import { Switch } from "@/components/ui/switch"

interface ToggleButtonProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function ToggleButton({ checked, onChange }: ToggleButtonProps) {
    return (
        <Switch
            checked={checked}
            onCheckedChange={onChange}
            className="data-[state=checked]:bg-gray-100 data-[state=checked]:text-black"
        />
    )
}
