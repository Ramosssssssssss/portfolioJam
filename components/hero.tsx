"use client"

import { ArrowDown, Github, Linkedin, Mail, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { SpotifyNowPlaying } from "@/components/spotify-now-playing"
import Link from "next/link"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Code snippets to animate
    const codeLines = [
      "const developer = {",
      "  name: 'Diego Ramos',",
      "  skills: ['React Native', 'React', 'Node.js'],",
      "  passion: 'Building amazing apps',",
      "};",
      "",
      "function createMagic() {",
      "  return code + creativity;",
      "}",
      "",
      "export default developer;",
    ]

    class CodeLine {
      x: number
      y: number
      text: string
      opacity: number
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.text = codeLines[Math.floor(Math.random() * codeLines.length)]
        this.opacity = Math.random() * 0.3 + 0.1
        this.speed = Math.random() * 0.3 + 0.1
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = -20
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.font = "14px 'JetBrains Mono', monospace"
        ctx.fillStyle = `rgba(150, 150, 150, ${this.opacity})`
        ctx.fillText(this.text, this.x, this.y)
      }
    }

    const lines: CodeLine[] = []
    for (let i = 0; i < 30; i++) {
      lines.push(new CodeLine())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        line.update()
        line.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <section id="hero" className="py-20 flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Image section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-foreground/20 via-foreground/10 to-foreground/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-foreground/10 shadow-2xl">
                  <img
                    src="/1.jpeg"
                    alt="Diego Ramos"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-foreground/20 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-foreground/10 rounded-full" />
                
                {/* Spotify Now Playing */}
                <SpotifyNowPlaying />
              </div>
            </div>

            {/* Content - centered text */}
            <div className="flex-1 text-center space-y-6">
              <div className="space-y-3">
                <p className="text-muted-foreground font-mono text-sm sm:text-base tracking-wider">
                  DESARROLLADOR FULL STACK
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none">
                  Diego
                  <br />
                  Ramos
                </h1>
                <div className="h-1 w-20 bg-foreground mx-auto" />
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto">
                Especializado en crear experiencias digitales excepcionales con{" "}
                <span className="text-foreground font-semibold">React Native</span>,{" "}
                <span className="text-foreground font-semibold">React</span> y{" "}
                <span className="text-foreground font-semibold">Node.js</span>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90" asChild>
                  <a href="#contact">
                    Contáctame
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-foreground/20 hover:bg-foreground/5 bg-transparent"
                  asChild
                >
                  <a href="#projects">Ver Proyectos</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-green-500/30 hover:bg-green-500/10 bg-transparent text-green-600 hover:text-green-500"
                  asChild
                >
                  <Link href="/reproductor">
                    <Radio className="h-4 w-4" />
                    Jam Session
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  href="https://github.com/diegoramos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/diego-mauricio-ramos-cordova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="mailto:diego@example.com"
                  className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  )
}
