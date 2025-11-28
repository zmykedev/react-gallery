import { motion } from 'motion/react'
import { Camera, Film, Target, Smartphone, Zap, Moon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { AuroraText } from '../ui/aurora-text'

const features = [
  {
    icon: Camera,
    spec: '26.0',
    unit: 'MP',
    title: 'Sensor APS-C Exmor R',
    description: 'Sensor CMOS retroiluminado con procesador BIONZ XR para un rendimiento excepcional.',
  },
  {
    icon: Film,
    spec: '4K',
    unit: '120fps',
    title: 'Video Profesional',
    description: 'Graba en 4K a 120fps, 10-bit 4:2:2 interno y S-Log3 para máxima flexibilidad.',
  },
  {
    icon: Target,
    spec: '759',
    unit: 'puntos AF',
    title: 'Autofoco IA Avanzado',
    description: 'Seguimiento en tiempo real de ojos, cara y cuerpo para humanos, animales y aves.',
  },
  {
    icon: Smartphone,
    spec: '5',
    unit: 'ejes IBIS',
    title: 'Estabilización Superior',
    description: 'Hasta 5 pasos de compensación para fotos nítidas y videos suaves sin trípode.',
  },
  {
    icon: Zap,
    spec: '11',
    unit: 'fps',
    title: 'Disparo Continuo',
    description: 'Captura la acción con ráfagas de hasta 11 fps con seguimiento AF/AE completo.',
  },
  {
    icon: Moon,
    spec: 'ISO',
    unit: '32000',
    title: 'Rendimiento Low Light',
    description: 'Rango ISO nativo de 100-32000, expandible hasta 102400 para condiciones extremas.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function Features() {
  return (
    <section id="features" className="relative py-20 bg-[#050505] snap-start snap-always min-h-screen flex flex-col justify-center">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sony-orange/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-[clamp(2rem,5vw,4rem)] font-bold text-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Características{' '}
          <AuroraText colors={["#f7931e", "#ff6b35", "#fff"]}>
              Destacadas            </AuroraText>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <Card className="relative p-6 sm:p-8 rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0a] transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-sony-orange/10 h-full">
                  {/* Subtle top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <CardContent className="flex flex-col gap-4 p-0 relative z-10">
                    {/* Icon - clean and minimal */}
                    <motion.div 
                      className="relative w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 rounded-lg bg-white/5 border border-white/10 group-hover:border-sony-orange/30 transition-colors duration-300" />
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/80 group-hover:text-sony-orange transition-colors duration-300 relative z-10" />
                    </motion.div>

                    {/* Spec Number - elegant typography */}
                    <motion.div 
                      className="text-center mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-baseline justify-center gap-2 flex-wrap">
                        <span className="text-3xl sm:text-4xl font-semibold text-white group-hover:text-sony-orange transition-colors duration-300">
                          {feature.spec}
                        </span>
                        <span className="text-lg sm:text-xl font-medium text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          {feature.unit}
                        </span>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <CardTitle className="text-lg sm:text-xl font-semibold text-center mb-3 text-white group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-sm sm:text-base text-white/50 text-center leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Subtle bottom accent on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sony-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

