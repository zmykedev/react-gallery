import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { SparklesText } from '../ui/sparkles-text'
import { TextAnimate } from '@/components/ui/text-animate'

interface GalleryItem {
  id: string
  cover: string
  alt: string
  title: string
  specs: string
  images: string[]
}

const galleries: GalleryItem[] = [
  {
    id: 'macro',
    cover: '/gallery_1.png',
    alt: 'Fotografía Macro',
    title: 'Detalle Macro',
    specs: '26MP • f/2.8 • ISO 100',
    images: ['/gallery_1.png', '/detalle_1.png', '/detalle_2.png'],
  },
  {
    id: 'paisaje',
    cover: '/gallery_2.png',
    alt: 'Paisaje Montañoso',
    title: 'Paisaje 4K HDR',
    specs: '4K 60fps • S-Log3',
    images: ['/gallery_2.png', '/4k_1.png', '/4k_2.png'],
  },
  {
    id: 'retrato',
    cover: '/gallery_3.png',
    alt: 'Retrato Nocturno',
    title: 'Retrato Low Light',
    specs: 'ISO 12800 • Eye AF',
    images: ['/gallery_3.png', '/retrato_1.png', '/retrato_2.png'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

interface GalleryCardProps {
  readonly gallery: GalleryItem
  readonly tilt: { rotateX: number; rotateY: number }
  readonly onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  readonly onMouseLeave: () => void
  readonly onClick: () => void
}

function GalleryCard({ gallery, tilt, onMouseMove, onMouseLeave, onClick }: GalleryCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative cursor-pointer aspect-4/3"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
    
        <motion.div
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] group"
          whileHover={{
            boxShadow: '0 25px 60px rgba(247, 147, 30, 0.15)',
          }}
        >
        <img
          src={gallery.cover}
          alt={gallery.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay - siempre visible en mobile, hover en desktop */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" 
          aria-hidden="true"
        />
        
        {/* Content overlay - siempre visible en mobile, con animación en desktop */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end ">
          <div className="text-xs sm:text-sm text-sony-orange font-mono tracking-wider mb-1 md:mb-2 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 md:delay-[50ms]">
            <TextAnimate 
              animation="blurInUp" 
              by="character" 
              once
            >
              {gallery.specs}
            </TextAnimate>
          </div>
          <div className="text-base sm:text-lg md:text-2xl font-semibold text-white mb-1 md:mb-3 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 md:delay-100">
          <TextAnimate animation="slideLeft" by="character" once>
          
              {gallery.title}
            </TextAnimate>
          </div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-white/60 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 md:delay-150">
            <TextAnimate 
              animation="blurInUp" 
              by="character" 
              once
            >
              Ver Galería
            </TextAnimate>
          </div>
        </div>
        </motion.div>
    </motion.div>
  )
}

export function Gallery() {
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [tiltStyle, setTiltStyle] = useState<Record<string, { rotateX: number; rotateY: number }>>({})

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    setTiltStyle(prev => ({ ...prev, [id]: { rotateX, rotateY } }))
  }, [])

  const handleMouseLeave = useCallback((id: string) => {
    setTiltStyle(prev => ({ ...prev, [id]: { rotateX: 0, rotateY: 0 } }))
  }, [])

  const openSlider = (gallery: GalleryItem) => {
    setSelectedGallery(gallery)
    setCurrentIndex(0)
  }

  const closeSlider = () => {
    setSelectedGallery(null)
    setCurrentIndex(0)
  }

  const goToSlide = (index: number) => {
    if (!selectedGallery) return
    const len = selectedGallery.images.length
    setCurrentIndex((index + len) % len)
  }

  return (
    <>
      <section id="gallery" className="py-16 sm:py-24 md:py-20 bg-[#080808] snap-start snap-always min-h-screen flex flex-col justify-center" style={{ perspective: '1000px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
          <motion.h2
            className="text-[clamp(2rem,5vw,4rem)] font-bold text-center mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-2">
              Capturado con{' '}
              <SparklesText
                className="text-sony-orange drop-shadow-[0_3px_18px_rgba(247,147,30,0.45)] font-extrabold"
                colors={{ first: "#f7931e", second: "#fff" }}
              >
                α6700
              </SparklesText>
            </div>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mt-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {galleries.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                gallery={gallery}
                tilt={tiltStyle[gallery.id] || { rotateX: 0, rotateY: 0 }}
                onMouseMove={(e) => handleMouseMove(e, gallery.id)}
                onMouseLeave={() => handleMouseLeave(gallery.id)}
                onClick={() => openSlider(gallery)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Slider Modal */}
      <Dialog open={!!selectedGallery} onOpenChange={closeSlider}>
        <DialogContent showCloseButton={false} className="max-w-[95vw] md:max-w-5xl lg:max-w-6xl w-full h-[95vh] max-h-[95vh] bg-black/97 border-none backdrop-blur-3xl p-0 gap-0 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {selectedGallery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col h-full min-h-0"
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-sony-orange hover:border-sony-orange hover:rotate-90 transition-all duration-300 cursor-pointer"
                  onClick={closeSlider}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Header */}
                <motion.div
                  className="text-center py-3 sm:py-4 md:py-6 px-4 flex-shrink-0"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                    {selectedGallery.title}
                  </h3>
                  <span className="text-xs sm:text-sm md:text-base text-sony-orange font-mono tracking-widest">
                    {selectedGallery.specs}
                  </span>
                </motion.div>

                {/* Slider Container */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-6 flex-1 min-h-0 overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/15 hover:bg-sony-orange/20 hover:border-sony-orange hover:scale-110 transition-all duration-300 shrink-0 cursor-pointer"
                    onClick={() => goToSlide(currentIndex - 1)}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </Button>

                  <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden flex-1 min-w-0 min-h-0 flex items-center justify-center bg-black/20">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={selectedGallery.images[currentIndex]}
                        alt={`${selectedGallery.title} - Imagen ${currentIndex + 1}`}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/15 hover:bg-sony-orange/20 hover:border-sony-orange hover:scale-110 transition-all duration-300 shrink-0 cursor-pointer"
                    onClick={() => goToSlide(currentIndex + 1)}
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </Button>
                </div>

                {/* Footer */}
                <motion.div
                  className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 py-3 sm:py-4 md:py-6 px-4 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {/* Indicators */}
                  <div className="flex gap-3">
                    {selectedGallery.images.map((_, index) => (
                      <button
                        key={index}
                        className={`relative w-10 h-1 rounded-full overflow-hidden transition-all duration-400 ${
                          index === currentIndex ? 'bg-transparent' : 'bg-white/20 hover:bg-white/30'
                        }`}
                        onClick={() => goToSlide(index)}
                      >
                        {index === currentIndex && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-sony-orange to-sony-orange-dark rounded-full"
                            layoutId="activeIndicator"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Counter */}
                  <span className="text-sm text-white/50 font-mono tracking-widest">
                    <span className="text-sony-orange font-semibold">
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    {' / '}
                    {String(selectedGallery.images.length).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}

