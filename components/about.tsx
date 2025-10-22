"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  {
    src: "/workspace-setup-developer-desk-monitors.jpg",
    alt: "Mi workspace de desarrollo",
  },
  {
    src: "/coding-session-dark-theme-multiple-screens.jpg",
    alt: "Sesión de código",
  },
  {
    src: "/mobile-app-development-react-native.jpg",
    alt: "Desarrollo mobile",
  },
  {
    src: "/team-collaboration-agile-development.jpg",
    alt: "Trabajo en equipo",
  },
]

export function About() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setIsAutoPlaying(false)
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-8 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Sobre mí</h2>
          <div className="h-1 w-20 bg-foreground" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Carrusel de imágenes */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

              {/* Controles del carrusel */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      setCurrentImage(index)
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImage ? "w-8 bg-foreground" : "w-1.5 bg-foreground/30"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decoración */}
            <div className="absolute -inset-4 border border-foreground/10 rounded-lg -z-10" />
          </div>

          {/* Contenido de texto */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Soy un desarrollador apasionado por crear aplicaciones móviles y web que no solo funcionan
                perfectamente, sino que también ofrecen experiencias de usuario excepcionales.
              </p>
              <p>
                Con experiencia sólida en <span className="text-foreground font-semibold">React Native</span> y{" "}
                <span className="text-foreground font-semibold">React</span>, he trabajado en proyectos que van desde
                startups hasta aplicaciones empresariales, siempre enfocándome en código limpio, rendimiento óptimo y
                arquitecturas escalables.
              </p>
              <p>
                Mi stack incluye tecnologías modernas como{" "}
                <span className="text-foreground font-semibold">Node.js</span>, TypeScript, y diversas herramientas del
                ecosistema JavaScript. Me encanta mantenerme actualizado con las últimas tendencias y mejores prácticas
                del desarrollo.
              </p>
              <p>
                Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a proyectos open source, y
                compartir conocimiento con la comunidad de desarrolladores.
              </p>
            </div>

            {/* Stats rápidos */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/10">
              <div>
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm text-muted-foreground">Años de experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Proyectos completados</div>
              </div>
              <div>
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
