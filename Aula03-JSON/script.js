const pessoa = {
    nome : "Maria" ,
    idade : 25 ,
    altura : 1.82 ,
    formacoes : [ "Bacharelado" , "Mestrado" ] ,
    casado : true ,
    conjuge : { nome : "João" , idade : 25 } ,
    filhos : [
        { nome : "Júlia" , idade : 5 } ,
        { nome : "Pedrinho" , idade : 2 }
    ] ,
    endereco : null ,
    getConjuge : function(){
        if( this.casado ){
            return "Cônjuge do(a) " + this.nome + ": " + this.conjuge.nome
        }else{
            return this.nome + " não é casado(a)!"
        }
    }
}

txt = "Nome: " + pessoa.nome + "<br>Idade: " + pessoa.idade
txt += "<br>Formações: "
pessoa.formacoes.forEach( formacao => {
    txt += " - " + formacao
})
txt += "<br>" + pessoa.getConjuge()
document.getElementById("divObjeto").innerHTML = txt



// --------------------------------------------------

function getDados(){
    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            const divJSON = document.getElementById("divJSON")
            divJSON.innerHTML = this.responseText
            const obj = JSON.parse( this.responseText )
            divJSON.innerHTML += "<BR><HR>Altura: " + obj.altura
            divJSON.innerHTML += "<br>Filhos: "
            obj.filhos.forEach( filho =>{
                divJSON.innerHTML += "<br>Nome: " + filho.nome + " - Idade: " + filho.idade
            })
        }

    }
    req.open("GET", "dados.json" , true )
    req.send()
}

function getProdutos(){
    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            const objJSON = JSON.parse( this.responseText ) 
            if( objJSON.erro ){
                alert( objJSON.erro )
            }else{
                const produtos = objJSON.produtos
                const divTabela = document.getElementById("divTabela")
                if( produtos.length == 0 ){
                    divTabela.innerHTML = "<h5>Nenhum produto cadastrado</h5>"
                }else{
                    var txt = '<table border="1">'
                    txt += '        <tr> '
                    txt += '            <th>Id</th> '
                    txt += '            <th>Nome</th> '
                    txt += '            <th>Preço</th> '
                    txt += '            <th>Excluir</th> '
                    txt += '        </tr> '
                    produtos.forEach( prod =>{
                        txt += '        <tr> '
                        txt += '            <td>' + prod.id + '</td> '
                        txt += '            <td>' + prod.nome + '</td> '
                        txt += '            <td>' + prod.preco + '</td> '
                        txt += '            <td><button onclick="deletar(' + prod.id + ')"> X </button></td> '
                        txt += '        </tr> '
                    })
                    txt += '</table>'
                    divTabela.innerHTML = txt
                }
            }
        }
    }
    req.open("GET" , "servidor.php?buscar" , true)
    req.send()
}

function deletar( idProd ){
    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            const objJSON = JSON.parse( this.responseText ) 
            alert( objJSON.resposta );
            getProdutos()
        }
    }
    req.open("GET" , "servidor.php?excluir&idProduto=" + idProd , true)
    req.send()
}


function add(  ){
    const nome = document.getElementById("txtNome").value 
    if( nome == "" ){
        alert("O campo nome é obrigatório!")
    }else{
        var sPreco = document.getElementById("txtPreco").value 
        var preco = 0.0
        if( sPreco != ""){
            sPreco = sPreco.replace("," , ".")
            preco = parseFloat( sPreco )
        }
        const req = new XMLHttpRequest()
        req.onreadystatechange = function(){
            if( this.readyState == 4 && this.status == 200){
                const objJSON = JSON.parse( this.responseText )
                txt = objJSON.resposta
                if( objJSON.idGerado )
                    txt += "\nId: " + objJSON.idGerado
                alert( txt )
                getProdutos()
            }
        }
        req.open("POST" , "servidor.php?inserir" , true)
        req.setRequestHeader( "Content-type" , "application/x-www-form-urlencoded" )
        req.send("name=" + nome + "&price=" + preco)
    }
}
