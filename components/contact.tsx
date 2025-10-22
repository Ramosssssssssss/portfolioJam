"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle form submission
    console.log("Form submitted:", formData)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })
    }, 1000)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="space-y-6 mb-16 sm:mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-foreground/30" />
              <span className="text-sm font-mono tracking-widest text-foreground/60">CONTACTO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Hablemos sobre tu
              <br />
              próximo proyecto
            </h2>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
            Estoy disponible para proyectos freelance, colaboraciones y oportunidades emocionantes. Respondo todos los
            mensajes en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Email */}
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-foreground/10 rounded-lg group-hover:bg-foreground/15 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a
                    href="mailto:diego@example.com"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group/link"
                  >
                    diego@example.com
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover/link:translate-x-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-foreground/10 rounded-lg group-hover:bg-foreground/15 transition-colors duration-300">
                  <Linkedin className="h-5 w-5 text-foreground" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-foreground">LinkedIn</h3>
                  <a
                    href="https://linkedin.com/in/diego-ramos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group/link"
                  >
                    diego-ramos
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover/link:translate-x-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div className="group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-foreground/10 rounded-lg group-hover:bg-foreground/15 transition-colors duration-300">
                  <Github className="h-5 w-5 text-foreground" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-foreground">GitHub</h3>
                  <a
                    href="https://github.com/diego-ramos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group/link"
                  >
                    diego-ramos
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover/link:translate-x-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-foreground/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">Disponible ahora</span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Abierto a proyectos freelance, tiempo completo y colaboraciones especiales.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-foreground/5 border-foreground/10 focus:border-foreground/30 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-foreground/5 border-foreground/10 focus:border-foreground/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto, idea o propuesta..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-foreground/5 border-foreground/10 focus:border-foreground/30 transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-all duration-300 h-12 font-semibold text-base gap-2 group"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <p className="text-xs text-foreground/50 text-center">
                Responderé tu mensaje lo antes posible. Gracias por tu interés.
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-foreground/60">© 2025 Diego Ramos. Diseñado y desarrollado con pasión.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/diego-ramos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/diego-ramos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:diego@example.com"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
