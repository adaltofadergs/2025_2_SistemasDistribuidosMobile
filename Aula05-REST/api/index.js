const express = require("express")
const knex = require("knex")
const errors = require("http-errors")

const cors = require("cors")

const app = express()

app.use( express.json() )
app.use( express.urlencoded( {extended : true}) )

//app.use( cors() )

app.use( cors({
    origin : "http://localhost" ,
    methods : [ "GET", "POST" , "PUT" , "DELETE"] ,
    allowedHeaders : [ 'Content-type' , 'Authorization' ] ,
    credentials : true
}) )


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
        .leftJoin("categoria" , "categoria.id", "=" , "produto.codCategoria")
        .select( "produto.*" , "categoria.nome AS categoria")
        .orderBy( "produto.nome" , "asc" )
        .then( dados => res.json( dados ) )
        .catch( next )
})


app.get( "/product/last" , (req, res, next)=>{
    conn( "produto" )
        .leftJoin("categoria" , "categoria.id", "=" , "produto.codCategoria")
        .select( "produto.*" , "categoria.nome AS categoria")
        .orderBy( "produto.id" , "desc" )
        .first()
        .then( dados => res.json( dados ) )
        .catch( next )
})
app.get( "/product/:idProd" , (req, res, next)=>{
    const idProduto = req.params.idProd
    conn( "produto" )
        .leftJoin("categoria" , "categoria.id", "=" , "produto.codCategoria")
        .select( "produto.*" , "categoria.nome AS categoria")
        .where( "produto.id" , idProduto )
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

// Criar no banco de dados a tabela CATEGORIA, contendo ID e NOME
// Editar a tabela PRODUTO, para que ela contenha a coluna codCategoria
// A coluna codCategoria deverá ser chave estrangeira para a tabela CATEGORIA;
// Editar os endpoins com GET, para que retornem o nome da categoria, 
// além dos dados que já são retornados.
// Adicionar na API, os endpoints para um CRUD completo em CATEGORIA.

app.get( "/category" , (req, res, next)=>{
    conn( "categoria" )
        .orderBy( "nome" , "asc" )
        .then( dados => res.json( dados ) )
        .catch( next )
})

app.get( "/category/:idCat" , (req, res, next)=>{
    const idCategoria = req.params.idCat
    conn( "categoria" )
        .where( "id" , idCategoria )
        .first()
        .then( dados => {
            if( !dados ){
                return next( errors(200 , "Nenhuma categoria encontrada")  )
            }
            res.json( dados )
        })
        .catch( next )
})

app.post( "/category" , (req, res, next)=>{
    conn( "categoria" )
        .insert( req.body )
        .then( dados => {
            if( !dados ){
                return next( errors(404 , "Erro ao inserir")  )
            }
            res.status(201).json( {
                reposta : "Categoria Inserida" ,
                id : dados[0]
            } )
        } )
        .catch( next )
})

app.put( "/category/:idCat" , (req, res, next)=>{
    const idCategoria = req.params.idCat
    conn( "categoria" )
        .where( "id" , idCategoria)
        .update( req.body )
        .then( dados => {
            if( !dados ){
                return next( errors(404 , "Erro ao tentar editar")  )
            }
            res.status(200).json( {
                reposta : "Categoria atualizada" 
            } )
        } )
        .catch( next )
})

app.delete( "/category/:idCat" , (req, res, next)=>{
    const idCategoria = req.params.idCat
    conn( "categoria" )
        .where( "id" , idCategoria )
        .delete( )
        .then( dados => {
            if( !dados ){
                return next( errors(404 , "Erro ao tentar excluir")  )
            }
            res.status(200).json( {
                reposta : "Categoria excluído com sucesso!" 
            } )
        } )
        .catch( next )
})