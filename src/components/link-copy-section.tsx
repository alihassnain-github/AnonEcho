"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function LinkCopySection() {
    const [link, setLink] = useState("https://www.truefeedback.site/u/johndoe")

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
    }

    const handleShowQR = () => {
        // QR code functionality would go here
        alert("QR code would be shown here")
    }

    return (
        <div className="mb-6">
            <h1 className="text-xl font-medium mb-3">Copy Your Unique Link</h1>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
                    readOnly
                />
                <Button onClick={handleCopy} className="bg-gray-100 hover:bg-gray-200 text-black">
                    Copy
                </Button>
                <Button onClick={handleShowQR} className="bg-gray-100 hover:bg-gray-200 text-black">
                    Show QR
                </Button>
            </div>
        </div>
    )
}
