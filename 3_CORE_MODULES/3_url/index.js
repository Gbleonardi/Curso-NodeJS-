const url = require('url')
const addres = "https://www.jesusebom.com.br/catalog?elereina=naterra"
const parsedUrl = new url.URL(addres)

console.log(parsedUrl.host)
console.log(parsedUrl.pathname)
console.log(parsedUrl.search)
console.log(parsedUrl.searchParams)
console.log(parsedUrl.searchParams.get('eleteina'))
