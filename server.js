const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
    const publicPath = "./public"
    const body = req.url === `/css/style.css`
    ? fs.readFileSync(`${publicPath}/css/style.css`, 'utf8')
    : fs.readFileSync(`${publicPath}/index.html`, 'utf8')
    res.end(body)
})

server.listen(3000)