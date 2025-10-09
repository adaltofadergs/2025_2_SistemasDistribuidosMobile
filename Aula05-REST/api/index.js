const express = require("express")
const knex = require("knex")
const errors = require("http-errors")

const app = express()

app.use( express.json() )
app.use( express.urlencoded( {extended : true}) )

const PORT = 8001
const HOSTNAME = "localhost"

const conn = knex( {
    client : "mysql" ,
    connection : {
        host : HOSTNAME ,
        user : "root" , 
        password : "" ,
        database : "loja_25_2"
    }
} )

app.get( "/" , (req, res, next)=>{
    res.json( { resposta : "Seja bem-vindo(a) à nossa API-REST"} )
} )

app.get( "/product" , (req, res, next)=>{
    conn( "produto" )
        .orderBy( "nome" , "asc" )
        .then( dados => res.json( dados ) )
        .catch( next )
})


app.get( "/product/last" , (req, res, next)=>{
    conn( "produto" )
        .orderBy( "id" , "desc" )
        .first()
        .then( dados => res.json( dados ) )
        .catch( next )
})
app.get( "/product/:idProd" , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn( "produto" )
        .where( "id" , idProduto )
        .first()
        .then( dados => {
            if( !dados ){
                return next( errors(200 , "Nenhum Produto encontrado")  )
            }
            res.json( dados )
        })
        .catch( next )
})

app.post( "/product" , (req, res, next)=>{
    conn( "produto" )
        .insert( req.body )
        .then( dados => {
            if( !dados ){
                return next( errors(404 , "Erro ao inserir")  )
            }
            res.status(201).json( {
                reposta : "Produto Inserido" ,
                id : dados[0]
            } )
        } )
        .catch( next )
})



app.put( "/product/:idProd" , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn( "produto" )
        .where( "id" , idProduto )
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next( errors(404 , "Erro ao tentar editar")  )
            }
            res.status(200).json( {
                reposta : "Produto atualizado" 
            } )
        } )
        .catch( next )
})

app.delete( "/product/:idProd" , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn( "produto" )
        .where( "id" , idProduto )
        .delete( )
        .then( dados => {
            if( !dados ){
                return next( errors(404 , "Erro ao tentar excluir")  )
            }
            res.status(200).json( {
                reposta : "Produto excluído com sucesso!" 
            } )
        } )
        .catch( next )
})


app.listen( PORT , ()=>{
    console.log( `Loja executando em http://${HOSTNAME}:${PORT}` )
})