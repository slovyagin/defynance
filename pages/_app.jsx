import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import '../assets/index.css'
import LogoSVG from '../assets/logo.svg'
import appConfig from '../appConfig.json'

function Logo () {
  return (
    <LogoSVG
      height={23}
      width={150}
      className='defynance-green-fill'
    />
  )
}

const components = {
  wrapper: props => (
    <section className='@md p-6 lg:p-10 pt-0 lg:pt-0'>
      <div className='max-w-screen-xl mx-auto' {...props} />
    </section>
  )
}

const App = ({ Component, pageProps, ...rest }) => {
  const router = useRouter()

  return (
    <MDXProvider components={components}>
      <Head key='head'>
        <title>{appConfig.name}</title>
        <link href={appConfig.fonts.sans} rel='stylesheet' />
        <link href={appConfig.fonts.serif} rel='stylesheet' />
        {/*<script src="https://www.google.com/recaptcha/api.js"/>*/}
      </Head>
      <header
        key='header'
        className='p-6 lg:p-10 top-0 w-full z-20 relative'
        style={{ backgroundColor: '#ffffff88' }}
      >
        <div className='flex max-w-screen-xl mx-auto'>
          {
            router.route === '/'
              ? <div className='p-1 -m-1 rounded r-2'><Logo /></div>
              : <Link href='/'>
                <a className='p-1 -m-1 rounded r-2'>
                  <Logo />
                </a>
              </Link>
          }
          <nav className='lg:ml-8 ml-6'>
            <a href='/how'>How we work</a>
            <a href='/about' className='ml-2'>About us</a>
          </nav>
        </div>
      </header>
      <main key='main'>
        <Component {...pageProps} />
      </main>
      <footer className='p-6 lg:p-10 w-full'>
        <div className='flex max-w-screen-xl mx-auto'>
          <span>&copy; 2020 Defynance, Ltd.</span>
          <ul className='ml-auto flex'>
            <li><a href='/privacy'>Privacy policy</a></li>
            <li className='ml-4'><a href='/terms'>Terms and conditions</a></li>
          </ul>
        </div>
      </footer>
    </MDXProvider>
  )
}

export default App
