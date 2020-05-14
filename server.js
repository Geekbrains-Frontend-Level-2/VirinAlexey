const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
    const publicPath = "./public"
    let body = null
    try {
     body = fs.readFileSync(`${publicPath}${req.url}`, 'utf8')
    } catch(e) {
        body = fs.readFileSync(`${publicPath}/index.html`, 'utf8')
    }

    res.end(body)
    
})

const port = process.env.PORT || 3000

server.listen(process.env.PORT || 3000)
console.log('Server started on port: ', port)
