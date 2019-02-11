export default function({ $axios, redirect }) {
  $axios.setToken(process.env.CLICKUP_ACCESS_TOKEN)

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    console.log(config)
  })

  $axios.onResponse(config => {
    console.log(config)
    $axios.setHeader('Access-Control-Allow-Origin', 'https://api.clickup.com')
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
