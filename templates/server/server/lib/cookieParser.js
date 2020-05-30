export default function (req, res, next) {
  const cookies = req.headers.cookie
  const result = {}
  if (cookies) {
    cookies.split(/; */).forEach(item => {
      const split = item.split('=')
      result[split[0]] = split[1]
    })
  }
  req.cookies = result

  return next()
}
