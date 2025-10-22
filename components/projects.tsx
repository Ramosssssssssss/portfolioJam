"use client"

import { ExternalLink, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const projects = [
  {
    title: "E-Commerce Mobile App",
    description:
      "Aplicación móvil completa de comercio electrónico con carrito de compras, pagos integrados y sistema de notificaciones push.",
    image: "/modern-mobile-ecommerce-app-interface-dark-theme.jpg",
    technologies: ["React Native", "TypeScript", "Redux", "Stripe", "Firebase"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Social Media Dashboard",
    description:
      "Dashboard web para gestión de redes sociales con analytics en tiempo real, programación de posts y métricas de engagement.",
    image: "/dark-social-media-analytics-dashboard.jpg",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Chart.js"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "Fitness Tracking App",
    description:
      "App móvil para seguimiento de ejercicios y nutrición con planes personalizados, estadísticas y gamificación.",
    image: "/fitness-tracking-mobile-app-dark-theme.jpg",
    technologies: ["React Native", "Expo", "PostgreSQL", "GraphQL", "AWS"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "Real-Time Chat Platform",
    description:
      "Plataforma de mensajería instantánea con salas, mensajes privados, compartir archivos y videollamadas.",
    image: "/modern-chat-application-interface-dark.jpg",
    technologies: ["React", "Node.js", "Socket.io", "WebRTC", "Redis"],
    github: "#",
    demo: "#",
    featured: true,
  },
]

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="space-y-16">
          <div className="space-y-4">
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                Proyectos <span className="text-muted-foreground">Destacados</span>
              </h2>
              <div className="h-1 bg-foreground w-1/3" />
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Soluciones innovadoras que combinan diseño excepcional con código limpio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-fr">
            {projects.map((project, index) => {
              const gridClass = project.featured ? "lg:col-span-7" : "lg:col-span-5"

              return (
                <div
                  key={index}
                  className={`${gridClass} group relative`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card className="h-full overflow-hidden border-foreground/10 bg-muted/30 backdrop-blur-sm hover:border-foreground/30 transition-all duration-500">
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                      />

                      <div
                        className={`absolute inset-0 bg-background/95 backdrop-blur-md transition-all duration-500 flex items-center justify-center p-8 ${
                          hoveredIndex === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="space-y-4 text-center">
                          <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                            {project.description}
                          </p>
                          <div className="flex gap-3 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 border-foreground/30 hover:bg-foreground hover:text-background bg-transparent"
                              asChild
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                Código
                              </a>
                            </Button>
                            <Button
                              size="sm"
                              className="gap-2 bg-foreground text-background hover:bg-foreground/80"
                              asChild
                            >
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                Ver Demo
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-foreground/20 group-hover:border-foreground/60 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-foreground/20 group-hover:border-foreground/60 transition-colors duration-300" />
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl sm:text-2xl font-bold leading-tight">{project.title}</h3>
                        {project.featured && (
                          <span className="px-2 py-1 text-xs font-medium bg-foreground text-background rounded">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-foreground/10 text-foreground rounded-full border border-foreground/20 whitespace-nowrap hover:bg-foreground/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
