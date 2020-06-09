import clsx from 'clsx'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import appConfig from '../app.config.json'
import calculator from '../components/index/calculator.config'

export default function Home () {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [sending, setSending] = React.useState('initial')
  const [err, setErr] = React.useState(false)
  const [price, setPrice] = React.useState(1e5)
  const [deposit, setDeposit] = React.useState(10)
  const [years, setYears] = React.useState(5)
  const [i, setI] = React.useState(calculator.output.switcher[0].c)

  React.useEffect(() => {
    let timeoutId
    if (['succeed', 'error'].includes(sending)) {
      timeoutId = window.setTimeout(() => setSending('initial'), 10000)
    } else {
      clearTimeout(timeoutId)
    }
  }, [sending])

  async function sendEmail () {
    const url = 'https://api.airtable.com/v0/appeBq5WaMAMoTlYB/Email'
    try {
      setSending('sending')
      await axios.post(url, {
          records: [
            {
              fields: {
                Email: email,
                Name: name
              }
            }
          ]
        },
        {
          headers: {
            Authorization: 'Bearer keyPh2NCeFXvPKVPO',
            'Content-Type': 'application/json'
          }
        })
      setEmail('')
      setName('')
      setSending('succeed')
    } catch (error) {
      setErr(error)
      setSending('error')
    }
  }

  return (
    <>
      <section className='px-6 lg:px-10 max-h-20 md:text-xl md:mb-16'>
        <div className='max-w-screen-xl mx-auto flex flex-col relative z-10'>
          <div className='relative z-10'>
            <p className='md:text-6xl text-4xl font-serif max-w-5xl'>
              <span className='text-blue-800'>Down payments are hard. </span>
              <br className='hidden lg:block' />
              <strong>Big, front page marketing slogan.</strong>
            </p>
            <p className='max-w-4xl'>
              With the average UK home buyer <a href='#'>paying over
              £40,000</a> up front,
              finding
              enough financial resources can seem like an impossibility. We want
              to give you another option.
            </p>
            <p className='max-w-4xl'>
              Instead, it offers the subtle compliment that you value their
              attention and interest in the subject at hand.
            </p>
            <form onSubmit={(event) => {
              event.preventDefault()
              sendEmail()
            }}
            >
              <div
                className='relative lg:w-3/4 mt-12 bg-yellow-100 border border-yellow-200 p-4 -m-4 rounded r-1 relative z-10'
              >
                <div>
                  <div className='mb-3'><strong>Left us your email here
                    to
                  </strong>
                  </div>
                  <div className='md:flex mb-3'>
                    <div className='lg:w-1/2 mb-3 md:mb-0 mr-2 flex-auto'>
                      <label
                        className='block mb-1 text-sm'
                        htmlFor='email'
                      >
                        Email:
                      </label>
                      <input
                        className='w-full lg input'
                        disabled={sending === 'sending'}
                        id='email'
                        name='email'
                        onChange={({ target: { value } }) => setEmail(value)}
                        placeholder='Enter your email here'
                        required
                        type='email'
                        value={email}
                      />
                    </div>

                    <div className='lg:w-1/2 mr-2 flex-auto'>
                      <label
                        className='block mb-1 text-sm'
                        htmlFor='name'
                      >
                        Name (optional):
                      </label>
                      <input
                        className='w-full lg input'
                        disabled={sending === 'sending'}
                        id='name'
                        name='name'
                        onChange={({ target: { value } }) => setName(value)}
                        placeholder='Enter your name here'
                        type='text'
                        value={name}
                      />
                    </div>
                  </div>
                  <button
                    type='submit'
                    className={clsx('btn lg mt-2 g-recaptcha', {
                      loading: sending === 'sending'
                    })}
                    disabled={sending === 'sending'}
                    data-sitekey="6LfmfQEVAAAAAOUQbJ3_y0YwTK1wUOAqeQj9re-Z"
                    data-callback='onSubmit'
                    data-action='submit'
                  >
                    {sending === 'sending' ? 'Registering your interest...' : 'Register your interest'}
                  </button>
                </div>
                {
                  sending === 'succeed'
                    ? (
                      <div
                        className='p-4 absolute flex flex-col inset-0 bg-yellow-200 justify-center items-center'
                      >
                        <p>Thanks for signing up! We will contact you soon</p>
                        <p>
                          <button
                            className='btn'
                            onClick={() => setSending('initial')}
                          >Got it!
                          </button>
                        </p>
                      </div>
                    )
                    : null
                }
                {
                  sending === 'error'
                    ? (
                      <div
                        className='p-4 absolute flex flex-col inset-0 bg-red-200 justify-center items-center'
                      >
                        <p>Unfotunately, we weren't able to send your application. We're sorry!</p>
                        <p>
                          <button
                            className='btn'
                            onClick={() => setSending('initial')}
                          >
                            Try again
                          </button>
                        </p>
                      </div>
                    )
                    : null
                }

              </div>
            </form>
          </div>
          <picture className='absolute right-0 top-0 w-1/2 select-none z-0'>
            <img
              style={{
                objectFit: 'contain',
                mixBlendMode: 'darken',
                marginTop: -80
              }}
              src='https://format-com-cld-res.cloudinary.com/image/private/s--YyLtTGi7--/c_limit,g_center,h_65535,w_1600/fl_keep_iptc.progressive,q_95/v1/059af61263218d4af0349e89e3f0da68/kite.jpg'
              alt='Sympathetic house'
            />
          </picture>
        </div>
      </section>
      <section
        className='p-4 lg:p-10 relative md:mb-16'
        style={{
          backgroundColor: '#f7fffc'
        }}
      >
        <div className='max-w-screen-xl mx-auto relative z-10'>
          <h2 className='mb-4'>How We Work</h2>
          <ol>
            <li className='mb-4 relative'>
              <dl>
                <dt className='text-2xl'>1. We fund your deposit</dt>
                <dd>Something clever written here</dd>
              </dl>
            </li>
            <li className='mb-4 relative'>
              <dl>
                <dt className='text-2xl'>2. You live in it</dt>
                <dd>(home is yours, etc etc etc.)</dd>
              </dl>
            </li>
            <li className='mb-4'>
              <dl>
                <dt className='text-2xl'>3. Pay us back in 15 years,
                  or whenever is comfortable
                </dt>
                <dd>Something descriptive</dd>
              </dl>
            </li>
          </ol>
          <picture className='absolute right-0 top-0 w-1/3 select-none'>
            <img
              style={{
                objectFit: 'contain',
                mixBlendMode: 'darken',
                marginTop: -80
              }}
              src='https://format-com-cld-res.cloudinary.com/image/private/s--kUNjzKrc--/c_limit,g_center,h_65535,w_1600/fl_keep_iptc.progressive,q_95/v1/1c19385914ff1b67e70bdbaaf6d45611/final2.jpg'
              alt='Sharing is caring'
            />
          </picture>
        </div>
      </section>

      <section
        className='p-4 lg:p-10 max-h-20'
        style={{
          backgroundColor: '#fffdf7'
        }}
      >
        <div className='max-w-screen-xl mx-auto'>
          <h2 className='mb-4'>
            {calculator.title}
          </h2>
          <form>
            <div className='md:flex'>
              <div
                className='md:w-1/3 grid grid-cols-2 gap-4 md:grid-cols-none md:block'>
                <div className='md:mb-4'>
                  <label
                    className='block mb-1 text-s mb-2'
                    htmlFor='price'
                  >
                    {calculator.form.purchasePrice.label}
                  </label>
                  <NumberFormat
                    allowNegative={false}
                    className='w-full lg input'
                    id='price'
                    isNumericString
                    name='price'
                    onValueChange={({ floatValue }) => setPrice(floatValue)}
                    prefix='£'
                    thousandSeparator
                    value={price}
                  />
                  <input
                    id='price-range'
                    min={calculator.form.purchasePrice.min}
                    max={calculator.form.purchasePrice.max}
                    name='price-range'
                    onChange={event => setPrice(event.target.value)}
                    step={calculator.form.purchasePrice.step}
                    type='range'
                    value={price}
                  />
                </div>
                <div className='md:mb-4'>
                  <label
                    className='block mb-1 text-s mb-2'
                    htmlFor='deposit'
                  >
                    {calculator.form.deposit.label}
                  </label>
                  <NumberFormat
                    allowNegative={false}
                    className='w-full lg input'
                    id='deposit'
                    isNumericString
                    name='deposit'
                    value={deposit}
                    format={value => {
                      if (value > calculator.form.deposit.max) {
                        return '100%'
                      } else if (value < calculator.form.deposit.min || !value) {
                        return '1%'
                      }
                      return `${value}%`
                    }}
                    onValueChange={({ floatValue }) => setDeposit(floatValue)}
                  />
                  <input
                    type='range'
                    id='deposit-range'
                    name='deposit-range'
                    min={calculator.form.deposit.min}
                    max={calculator.form.deposit.max}
                    value={deposit}
                    onChange={event => setDeposit(event.target.value)}
                  />
                </div>
                <div className='md:mb-4'>
                  <label
                    className='block mb-1 text-s mb-2'
                    htmlFor='years'
                  >
                    {calculator.form.period.label}
                  </label>
                  <NumberFormat
                    className='w-full lg input'
                    id='years'
                    inputMode='numeric'
                    min={calculator.form.period.min}
                    max={calculator.form.period.max}
                    name='years'
                    required
                    suffix={years > 1 ? ' years' : ' year'}
                    value={years}
                    format={value => {
                      if (value > calculator.form.period.max) {
                        return `${calculator.form.deposit.max} years`
                      } else if (value <= calculator.form.deposit.min || !value) {
                        return '1 year'
                      }
                      return `${value} years`
                    }}
                    onValueChange={({ floatValue }) => setYears(floatValue)}
                  />
                  <input
                    type='range'
                    id='deposit-range'
                    name='deposit-range'
                    min={calculator.form.period.min}
                    max={calculator.form.period.max}
                    value={years}
                    onChange={event => setYears(event.target.value)}
                  />
                </div>
              </div>
              <div className='md:w-2/3 md:ml-8 mt-8 md:text-2xl'>
                <div className='mb-4 flex select-none'>
                  {
                    calculator.output.switcher.map(({ label, name, c }, idx, arr) => {
                      const isActive = i === c
                      return (
                        <label
                          key={name}
                          htmlFor={name}
                          className={clsx('transition transition-colors duration-200 block mb-1 text-s mb-2 text-gray-500 border-2 border-gray-600 text-base p-2', {
                            'bg-gray-400 text-gray-900': isActive,
                            'hover:bg-gray-200 cursor-pointer': !isActive,
                            'rounded-l-sm': idx === 0,
                            'border-l-0': idx > 0,
                            'rounded-r-sm': idx === arr.length - 1
                          })}
                        >
                          {label}
                          <input
                            className='hidden'
                            type='radio'
                            value={name}
                            name={name}
                            id={name}
                            checked={isActive}
                            onChange={() => setI(c)}
                          />
                        </label>
                      )
                    })
                  }
                </div>
                <div className='mb-4'>
                  <b>{calculator.output.fields.fund.label}</b> <NumberFormat
                  thousandSeparator
                  prefix='£'
                  displayType='text'
                  value={Math.round(price * (deposit * 0.01))}
                />
                </div>
                <div className='mb-4'>
                  <b>{calculator.output.fields.futureValue.label}</b>
                  <NumberFormat
                    thousandSeparator
                    prefix='£'
                    displayType='text'
                    value={Math.round(price * ((i + 1) ** years))}
                  />
                </div>
                <div className='mb-4'>
                  <b>{calculator.output.fields.yourShare.label}</b>
                  <NumberFormat
                    thousandSeparator
                    prefix='£'
                    displayType='text'
                    value={Math.round(price * (1 - ((deposit * 0.01) / 0.8)) * ((i + 1) ** years))}
                  />
                </div>
                <div className='mb-4'>
                  <b>{calculator.output.fields.ourShare.label}</b> <NumberFormat
                  thousandSeparator
                  prefix='£'
                  displayType='text'
                  value={Math.round(((deposit * 0.01) / 0.8) * price * ((i + 1) ** years))}
                />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
