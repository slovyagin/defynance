import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import '../assets/index.css'
import LogoSVG from '../assets/logo.svg'
import appConfig from '../app.config.json'

function Logo () {
  return (
    <div className="text-green-500">
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
  const [cookiesAccepted, setCookiesAccepted] = React.useState(false)

  React.useEffect(() => {
    const ls = window.localStorage
    const LS_KEY = '@defynance:cookie-accepted'
    const lsValue = getLsValue()
    setCookiesAccepted(lsValue)

    if (cookiesAccepted && !lsValue) {
      ls.setItem(LS_KEY, 'true')
    }

    function getLsValue () {
      try {
        return JSON.parse(ls.getItem(LS_KEY))
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
    <MDXProvider components={components}>
      <Head key='head'>
        <title>{appConfig.name}</title>
        <link href={appConfig.fonts.sans.url} rel='stylesheet' />
        <link href={appConfig.fonts.serif.url} rel='stylesheet' />
        {/*<script src="https://www.google.com/recaptcha/api.js"/>*/}
      </Head>
      <header
        key='header'
        className='p-4 lg:p-10 top-0 w-full z-20 relative'
      >
        <div className='md:flex max-w-screen-xl mx-auto'>
          {
            router.route === '/'
              ? <div className='p-1 -m-1 rounded r-2 border border-transparent'>
                <Logo /></div>
              : <Link href='/'>
                <a
                  className='p-1 -m-1 rounded r-2 block hover:border-green-500 border border-transparent'>
                  <Logo />
                </a>
              </Link>
          }
          <nav className='lg:ml-8 md:ml-6 mt-4 md:mt-0 items-start'>
            <a href='/how'>How we work</a>
            <a href='/about' className='ml-2'>About us</a>
          </nav>
        </div>
      </header>
      <main key='main'>
        <Component {...pageProps} />
      </main>
      <footer className='p-4 lg:p-10 w-full'>
        <div className='md:flex max-w-screen-xl mx-auto'>
          <p>&copy; 2020 Defynance, Ltd.</p>
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
          :
          (<aside
              className='text-xs p-4 fixed flex justify-center bottom-0 right-0 left-0 z-20'
            >
              <div
                className="max-w-lg w-full p-2 rounded shadow-md bg-gray-100 flex"
              >
                <span>
                  We us cookies. To continue using this site you must accept
                our <a href='/terms'>terms and conditions</a>.
                </span>
                <button
                  className="btn ml-auto"
                  onClick={() => setCookiesAccepted(true)}
                >
                  Cool then. Accept
                </button>
              </div>
            </aside>
          )
      }
    </MDXProvider>
  )
}

export default App
