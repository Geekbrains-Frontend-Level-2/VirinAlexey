const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
    const publicPath = "./public"
    let body = null
    if (req.url === `/css/style.css`) {
     body = fs.readFileSync(`${publicPath}/css/style.css`, 'utf8')
    } else if (req.url === `/js/main.js` ) {
      body = fs.readFileSync(`${publicPath}/js/main.js`, 'utf8')
    } else {
        body = fs.readFileSync(`${publicPath}/index.html`, 'utf8')
    }
    console.log(body)
    res.end(body)
    
})

const port = process.env.PORT || 3000

server.listen(process.env.PORT || 3000)
console.log('Server started on port: ', port)
