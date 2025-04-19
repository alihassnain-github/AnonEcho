import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const avatars = [
  { src: "/assets/avatar/01.jpg", fallback: "JD", alt: "John Doe" },
  { src: "/assets/avatar/02.jpg", fallback: "AB", alt: "Alice Brown" },
  { src: "/assets/avatar/03.jpg", fallback: "CK", alt: "Chris Kim" },
  { src: "/assets/avatar/04.jpg", fallback: "TD", alt: "Taylor Davis" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              Honest Feedback, Complete Privacy
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Where <span className="underline decoration-4 decoration-gray-400">anonymous voices</span> create real
              impact
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
              AnonEcho provides a safe space for honest feedback without fear of judgment. Empower your team, customers,
              or audience to speak freely.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gap-2" asChild>
                <Link href={"/signup"}>
                  Get started for free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={"#how-it-works"}>
                  See how it works
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {avatars.map(({ src, alt, fallback }) => (
                  <Avatar key={alt} className="w-12 h-12 border-2 border-white dark:border-black">
                    <AvatarImage src={src} alt={alt} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trusted by <span className="font-medium">2,000+</span> teams worldwide
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-50" />
            <div className="grid grid-cols-1 gap-4 relative">
              <Card className="border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Anonymous Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    &quot;The team meeting format has improved dramatically since we started collecting anonymous feedback. People are more honest now.&quot;
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 border-t pt-2">Received 2 hours ago</CardFooter>
              </Card>
              <Card className="border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] md:ml-12">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Anonymous Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    &quot;I&#39;ve always wanted to suggest changes to our product roadmap but was afraid of judgment. AnonEcho gave me that voice.&quot;
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 border-t pt-2">Received 5 hours ago</CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12 border-y border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">98%</p>
            <p className="text-gray-600 dark:text-gray-400">Increase in honest feedback</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">10k+</p>
            <p className="text-gray-600 dark:text-gray-400">Anonymous messages sent</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold mb-2">500+</p>
            <p className="text-gray-600 dark:text-gray-400">Organizations using AnonEcho</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-16 md:py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-block">
            <Badge variant="outline" className="px-3 py-1 text-sm mb-4">
              Simple Process
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">How AnonEcho works</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Experience seamless and secure anonymous feedback in just a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold mb-5">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Set Up Your Anonymous Channel</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
              Quickly create a secure space where feedback can be shared anonymously.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold mb-5">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Share the Link</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
              Distribute the unique link to your team or audience to start receiving feedback.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold mb-5">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Receive Instant Feedback</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
              Collect and review feedback in real-time, maintaining complete anonymity and security.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to hear what people really think?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Start collecting honest, anonymous feedback today and transform your organization with real insights.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href={"/signup"}>
              Get started for free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center flex-col text-center">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xl font-bold text-center">AnonEcho</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Empowering honest communication through
              <br />
              anonymous feedback.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/alihassnain-github/AnonEcho" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/in/alihassnain-webdev/" target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} AnonEcho. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
