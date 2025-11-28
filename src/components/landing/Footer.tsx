"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const gallerySection = document.getElementById('gallery')
    if (!gallerySection) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.5, 
      }
    )

    observer.observe(gallerySection)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="py-3 bg-black/80 backdrop-blur-sm border-t border-white/5 snap-start snap-always fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs text-white/40">
                © 2024 Sony Corporation. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">Desarrollado por</span>
                <span className="text-xs font-semibold text-sony-orange">MykeDev</span>
              </div>
            </div>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}

