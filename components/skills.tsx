"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "React Native", level: 95, category: "Mobile" },
  { name: "React", level: 95, category: "Frontend" },
  { name: "Node.js", level: 90, category: "Backend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "Express", level: 85, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Database" },
  { name: "PostgreSQL", level: 80, category: "Database" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Redux", level: 85, category: "State Management" },
  { name: "GraphQL", level: 75, category: "Backend" },
  { name: "AWS", level: 70, category: "Cloud" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "Git", level: 90, category: "Tools" },
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Skills & Tecnologías</h2>
            <div className="h-1 w-20 bg-foreground mx-auto" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nivel de experiencia en las tecnologías que domino
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="space-y-3 group"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.05}s both` : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{skill.category}</p>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">{skill.level}%</span>
                </div>

                <div className="relative h-2 bg-muted rounded-full overflow-hidden border border-foreground/10">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
