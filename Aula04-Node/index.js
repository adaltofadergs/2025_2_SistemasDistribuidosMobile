const http = require("http")

const HOSTNAME = "127.0.0.1"
const PORT = 3000

const server = http.createServer( (req , res) => { 
    res.statusCode = 200
    res.setHeader( "Content-type" , "text/plain")
    res.end( "Olá Mundinho")
} )

server.listen( PORT , HOSTNAME , ()=>{
    console.log(`Servidor rodando em: http://${HOSTNAME}:${PORT}`)
} )
