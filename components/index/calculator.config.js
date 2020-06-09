export default {
  title: 'Rough Calculator',
  form: {
    purchasePrice: {
      label: 'Purchase price, £',
      initialValue: 1e5,
      min: 0,
      max: 1e7,
      step: 500,
    },
    deposit: {
      label: 'Percent deposit',
      initialValue: 10,
      min: 1,
      max: 100,
    },
    period: {
      label: 'Period, up to 15 years',
      initialValue: 5,
      min: 1,
      max: 15,
    }
  },
  output: {
    switcher: [
      {
        label: 'Average increase',
        name: 'average',
        c: 0.06
      },
      {
        label: 'Decline in value',
        name: 'decline',
        c: -0.02
      }
    ],
    fields: {
      fund: {
        label: 'We fund: ',
      },
      futureValue: {
        label: 'Future home value: ',
      },
      yourShare: {
        label: 'Your share: ',
      },
      ourShare: {
        label: 'Our share: ',
      }
    }
  }
}
