import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { MDXProvider } from '@mdx-js/react'
import '../assets/index.css'
import LogoSVG from '../assets/logo.svg'
import appConfig from '../app.config.json'
import nav from '../configs/nav.config'

function Logo () {
  return (
    <div className='text-green-500'>
      <LogoSVG
        height={23}
        width={150}
        className='fill-current'
      />
    </div>
  )
}

const components = {
  wrapper: props => (
    <section className='@md p-4 lg:p-10 pt-0 lg:pt-0'>
      <div className='max-w-screen-xl mx-auto' {...props} />
    </section>
  )
}

function useCookiesBanner () {
  const router = useRouter()
  const [cookiesAccepted, setCookiesAccepted] = React.useState('initial')

  React.useEffect(() => {
    const ls = window.localStorage
    const LS_KEY = '@defynance:cookie-accepted'
    const lsValue = getLsValue()
    if (cookiesAccepted === true) {
      ls.setItem(LS_KEY, cookiesAccepted)
    }
    setCookiesAccepted(lsValue)

    function getLsValue () {
      try {
        return !!JSON.parse(ls.getItem(LS_KEY))
      } catch {
        return false
      }
    }
  }, [cookiesAccepted])

  return [cookiesAccepted, setCookiesAccepted]
}

const App = ({ Component, pageProps, ...rest }) => {
  const [cookiesAccepted, setCookiesAccepted] = useCookiesBanner()
  const router = useRouter()

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <MDXProvider components={components}>
        <Head key='head'>
          <title>{appConfig.name}</title>
          <link href={appConfig.fonts.sans.url} rel='stylesheet' />
          <link href={appConfig.fonts.serif.url} rel='stylesheet' />
          <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
          <link rel='alternate icon' href='/favicon.ico' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ff8a01' />
          <link rel='apple-touch-icon' sizes='180x180'
                href='/apple-touch-icon.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#43b649' />
          <meta name='msapplication-TileColor' content='#00a300' />
          <meta name='theme-color' content='#ffffff' />
          <meta name='description' content={appConfig.description} />
          <meta itemprop='name' content={appConfig.name} />
          <meta itemprop='description' content={appConfig.description} />
          <meta itemprop='image' content={appConfig.splashImage} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content={appConfig.url} />
          <meta name='twitter:title' content={appConfig.name} />
          <meta name='twitter:description' content={appConfig.description} />
          <meta name='twitter:creator' content={appConfig.url} />
          <meta name='twitter:image' content={appConfig.splashImage} />
          <meta name='twitter:image:alt' content={appConfig.description} />
          <meta property='og:title' content={appConfig.name} />
          <meta property='og:type' content='article' />
          <meta property='og:url' content={appConfig.url} />
          <meta property='og:image' content={appConfig.splashImage} />
          <meta property='og:description' content={appConfig.description} />
          <meta property='og:site_name' content={appConfig.name} />
        </Head>
        <header
          key='header'
          className='p-4 lg:p-10 top-0 w-full z-20 relative'
        >
          <div className='md:flex max-w-screen-xl mx-auto'>
            {
              router.route === '/'
                ? <div
                  className='p-1 -m-1 rounded r-2 border border-transparent'>
                  <Logo />
                </div>
                : <Link href='/'>
                  <a
                    className='p-1 -m-1 rounded r-2 block hover:border-green-500 border border-transparent'
                  >
                    <Logo />
                  </a>
                </Link>
            }
            <nav className='lg:ml-8 md:ml-6 mt-4 md:mt-0 items-start'>
              {
                nav.map(({ name, url }, i) => {
                  return (
                    <a
                      key={name}
                      className={
                        clsx({
                          'pointer-events-none border-green-400 text-black': router.pathname === `/${url}`,
                          'ml-2': i > 0
                        })
                      }
                      href={`/${url}`}
                    >
                      {name}
                    </a>
                  )
                })
              }
            </nav>
          </div>
        </header>
        <main key='main'>
          <Component {...pageProps} />
        </main>
        <footer className='p-4 lg:p-10 w-full'>
          <div className='md:flex max-w-screen-xl mx-auto'>
            <div>&copy; 2020 Defynance, Ltd.</div>
            <ul className='ml-auto md:flex'>
              <li><a href='/privacy'>Privacy policy</a></li>
              <li className='md:ml-4'><a href='/terms'>Terms and conditions</a>
              </li>
            </ul>
          </div>
        </footer>
        {
          cookiesAccepted
            ? null
            : (
              <aside
                className='text-xs p-4 fixed flex justify-center bottom-0 right-0 left-0 z-20'
              >
                <div
                  className='max-w-lg w-full p-2 rounded shadow-md bg-gray-100 flex'
                >
                <span>
                  We use cookies to remember your preferences and enhance your experience on our website. <a
                  href='/privacy'
                >Click here to see our cookie policy
                  </a>.
                </span>
                  <button
                    className='btn ml-auto'
                    onClick={() => setCookiesAccepted(true)}
                  >
                    Got it
                  </button>
                </div>
              </aside>
            )
        }
      </MDXProvider>
    </GoogleReCaptchaProvider>
  )
}

export default App
