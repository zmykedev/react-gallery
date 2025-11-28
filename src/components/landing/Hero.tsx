import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { VideoText } from '../ui/video-text'
import { TextAnimate } from '@/components/ui/text-animate'

type ContentState = 'video' | 'animated'

function ContentRender({ state }: { readonly state: ContentState }) {
  const text = 'α6700'
  const containerClassName = "relative h-[160px] w-full overflow-hidden mt-6 mb-2 sm:mb-4"
  const textClassName = "text-[clamp(3.5rem,12vw,10rem)] sm:text-[clamp(5rem,15vw,11rem)] font-bold leading-none"
const fontFamily = "sans-serif"
  switch (state) {
    case 'video':
      return (
        <div className={containerClassName}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute inset-0"
          >
            <VideoText 
              src="https://storage.googleapis.com/recurso-texto/d924-9530-4243-bc2e-043fbd069b0d.webm"
              className="h-[clamp(3.5rem,12vw,10rem)] sm:h-[clamp(5rem,15vw,12rem)] w-full"
              fontSize={20}
              fontWeight="bold"
              fontFamily={fontFamily}
              autoPlay={true}
              muted={true}
              loop={true}
              preload="auto"
            >
              {text}
            </VideoText>
          </motion.div>
        </div>
      )

    case 'animated':
      return (
        <div className={containerClassName}>
          <div className={textClassName} style={{ fontFamily }}>
            <TextAnimate 
              animation="blurInUp" 
              by="character" 
              once
              className="block"
            >
              {text}
            </TextAnimate>
          </div>
        </div>
      )

    default:
      return null
  }
}

export function Hero() {
  const [contentState, setContentState] = useState<ContentState>('video')

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setContentState('animated')
    }, 3000)

   

    return () => {
      clearTimeout(timer1)
    }
  }, [])
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden snap-start snap-always">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(247,147,30,0.1) 0%, transparent 50%),
            linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), 
            url('/hero_bg.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-sony-orange/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sony-orange-dark/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* WarpBackground */}
        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full px-4 sm:px-6 md:px-8 mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <AnimatedGradientText>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Sony Alpha Series
            </span>
          </AnimatedGradientText>
        </motion.div>

        <AnimatePresence mode="wait">
          <ContentRender key={contentState} state={contentState} />
        </AnimatePresence>

        <motion.p
          className="text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(1.8rem,4vw,3rem)] font-semibold mb-4 sm:mb-6 tracking-tight px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Unleash Your{' '}
          <span className="bg-gradient-to-r from-sony-orange to-sony-orange-dark bg-clip-text text-transparent">
            Vision
          </span>
        </motion.p>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 font-light leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          El poder de la creación de contenido APS-C de próxima generación. 
          Sensor de 26MP, video 4K 120fps, estabilización de 5 ejes y el mejor autofoco del mundo.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:justify-evenly  px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold uppercase tracking-wider bg-gradient-to-r from-sony-orange to-sony-orange-dark hover:from-sony-orange-dark hover:to-sony-orange text-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(247,147,30,0.3)]"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar Más
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold uppercase tracking-wider border-2 border-white/30 bg-transparent text-white rounded-full hover:border-sony-orange hover:text-sony-orange hover:bg-sony-orange/10 transition-all duration-300"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Imágenes
          </Button>
        </motion.div>
        </div>

     
    </section>
  )
}

