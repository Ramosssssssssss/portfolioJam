"use client"

import { useState } from "react"
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react"

const experiences = [
  {
    title: "Senior Mobile Developer",
    company: "Tech Company",
    location: "Remote",
    period: "2022 - Presente",
    description:
      "Liderando el desarrollo de aplicaciones móviles con React Native, implementando arquitecturas escalables y mejorando el rendimiento de las apps.",
    achievements: [
      "Reduje el tiempo de carga de la app en un 40%",
      "Lideré un equipo de 5 desarrolladores",
      "Implementé CI/CD reduciendo bugs en producción en 60%",
    ],
    technologies: ["React Native", "TypeScript", "Redux", "Firebase"],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    location: "Híbrido",
    period: "2020 - 2022",
    description:
      "Desarrollo de aplicaciones web y móviles end-to-end, desde el diseño de APIs hasta la implementación de interfaces de usuario.",
    achievements: [
      "Desarrollé 15+ proyectos para clientes internacionales",
      "Optimicé APIs reduciendo tiempos de respuesta en 50%",
      "Mentoricé a 3 desarrolladores junior",
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    title: "Frontend Developer",
    company: "Startup",
    location: "Presencial",
    period: "2018 - 2020",
    description:
      "Creación de interfaces de usuario modernas y responsivas, optimización de rendimiento y colaboración con equipos de diseño.",
    achievements: [
      "Construí el sistema de diseño de la empresa desde cero",
      "Mejoré el performance de la web en un 70%",
      "Implementé testing automatizado con 85% de cobertura",
    ],
    technologies: ["React", "JavaScript", "CSS", "REST APIs"],
  },
]

export function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Trayectoria Profesional</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mi evolución como desarrollador a través de diferentes roles y desafíos
            </p>
          </div>

          <div className="relative">
            {/* Línea vertical del timeline */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/20 via-foreground/40 to-foreground/20 transform md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Punto en la línea del timeline */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-foreground rounded-full transform -translate-x-1/2 ring-4 ring-background z-10">
                    <div className="absolute inset-0 bg-foreground rounded-full animate-ping opacity-20" />
                  </div>

                  {/* Contenido - alterna izquierda/derecha en desktop */}
                  <div
                    className={`${index % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"} pl-8 md:pl-0`}
                  >
                    <div
                      className={`group cursor-pointer ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-foreground/40 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                        {/* Header */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl sm:text-2xl font-bold leading-tight">{exp.title}</h3>
                            <ChevronRight
                              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                                activeIndex === index ? "rotate-90" : ""
                              }`}
                            />
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4" />
                              <span className="font-medium">{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

                        {/* Achievements - expandible */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            activeIndex === index ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pt-4 border-t border-border space-y-2">
                            <h4 className="text-sm font-semibold mb-3">Logros destacados:</h4>
                            {exp.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">{achievement}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-foreground/10 rounded-tr-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Espacio vacío para el otro lado del timeline en desktop */}
                  <div className="hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
