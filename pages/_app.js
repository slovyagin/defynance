import Head from 'next/head'
import Link from 'next/link'
import '../assets/index.css'
import appConfig from '../appConfig.json'
import { useRouter } from 'next/router'

const App = ({ Component, pageProps, ...rest }) => {
  const router = useRouter()

  return (
    <>
      <Head key='head'>
        <title>{appConfig.name}</title>
        <link
          href={appConfig.googleFontsUrl}
          rel='stylesheet'
        />
      </Head>
      <header key='header'>
        <h1>{
          router.route === '/'
            ? appConfig.name
            : <Link href='/'><a>{appConfig.name}</a></Link>
        }
        </h1>
      </header>
      <main key='main'>
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </>
  )
}

export default App
