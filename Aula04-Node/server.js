const http = require("http")
const mysql = require("mysql")

const HOSTNAME = "127.0.0.1"
const PORT = 3000

const conn = mysql.createConnection( {
    host : HOSTNAME ,
    user : "root" ,
    password : "" ,
    database : "loja_25_2"
} )

const server = http.createServer( (req , res) => { 
    res.statusCode = 200
    res.setHeader( "Content-type" , "application/json")
    try{
        if( conn.state != "authenticated"){
            conn.connect( function( err ){
                if( err ){
                    res.end( JSON.stringify({
                            resposta : "Erro na Conexão!" ,
                            erro : err
                        })  
                    )
                }else{
                    consultar( res )
                }
            })
        }else{
            consultar( res )
        }
    }catch( error ){
        res.statusCode = 500
        res.end( '{ "resposta" : "Erro no servidor!" }' )
    }
    
} )


function consultar( res ){
    const sql = "SELECT * FROM produto ORDER BY nome"
    conn.query( sql , (err, result, fields)=>{
        if( err ){
            res.statusCode = 500
            res.end( JSON.stringify({
                    resposta : "Erro na Consulta!" ,
                    erro : err
                })  
            )
        }else{
            res.statusCode = 200
            res.end( JSON.stringify( result ) )
        }
    } )
}


server.listen( PORT , HOSTNAME , ()=>{
    console.log(`Servidor rodando em: http://${HOSTNAME}:${PORT}`)
} )