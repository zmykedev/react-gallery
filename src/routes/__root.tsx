import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Sony α6700 | Unleash Your Vision',
      },
      {
        name: 'description',
        content: 'El poder de la creación de contenido APS-C de próxima generación. Sensor de 26MP, video 4K 120fps, estabilización de 5 ejes y el mejor autofoco del mundo.',
      },
      {
        name: 'keywords',
        content: 'Sony, Alpha, α6700, cámara, fotografía, video, 4K, APS-C, sensor 26MP, autofoco, estabilización',
      },
      {
        name: 'author',
        content: 'Sony Corporation',
      },
      {
        name: 'theme-color',
        content: '#F7931E',
      },
      // Open Graph
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Sony α6700 | Unleash Your Vision',
      },
      {
        property: 'og:description',
        content: 'El poder de la creación de contenido APS-C de próxima generación. Sensor de 26MP, video 4K 120fps, estabilización de 5 ejes y el mejor autofoco del mundo.',
      },
      {
        property: 'og:image',
        content: '/hero_bg.png',
      },
      {
        property: 'og:url',
        content: globalThis.window?.location.href ?? '',
      },
      {
        property: 'og:site_name',
        content: 'Sony α6700',
      },
      {
        property: 'og:locale',
        content: 'es_ES',
      },
      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Sony α6700 | Unleash Your Vision',
      },
      {
        name: 'twitter:description',
        content: 'El poder de la creación de contenido APS-C de próxima generación. Sensor de 26MP, video 4K 120fps, estabilización de 5 ejes y el mejor autofoco del mundo.',
      },
      {
        name: 'twitter:image',
        content: '/hero_bg.png',
      },
      // Robots
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      },
      // Favicon
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/lensico.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: '/logo192.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '512x512',
        href: '/logo512.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  return <RootDocument><Outlet /></RootDocument>
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
       
        <Scripts />
      </body>
    </html>
  )
}
