"use client"

import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { Check, Copy, Download, ScanQrCode, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRef, useState } from "react"

export default function LinkCopySection() {

    const inputRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState<boolean>(false);

    function handleCopy() {
        if (!inputRef.current) return
        const value = inputRef.current.value
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        })
    }

    return (
        <div className="mb-6">
            <h1 className="text-xl font-medium mb-3">Copy Your Unique Link</h1>
            <div className="flex gap-4">
                <Input type="url" className="shadow-lg border-1 border-black" value={"https://www.truefeedback.site/dashboard"} readOnly disabled ref={inputRef} />
                <div className="flex gap-2">
                    <Button onClick={handleCopy}>
                        {copied ?
                            <>
                                <Check /> Copied
                            </> : <>
                                <Copy /> Copy
                            </>}
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <ScanQrCode /> Show QR
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] p-0 gap-0">
                            <DialogHeader className="p-6 pb-0 flex flex-row items-start justify-between">
                                <DialogTitle className="text-xl font-semibold">Your QR Code</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col md:flex-row p-6 gap-6">
                                <div className="p-4 rounded-md w-full md:w-auto flex-shrink-0">
                                    <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="w-[200px] h-[200px]" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <p>
                                            Your unique QR code has been generated. You can download it or share the link directly.
                                        </p>

                                        <div className="space-y-3">
                                            <Button className="w-full">
                                                <Download className="mr-2 h-4 w-4" /> Download QR Code
                                            </Button>
                                            <Button variant="outline" className="w-full">
                                                <Share2 className="mr-2 h-4 w-4" /> Share Profile Link
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-sm mt-4">Scan and share your feedback</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
