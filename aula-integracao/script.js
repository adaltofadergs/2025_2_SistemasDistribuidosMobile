function cadastrar(){
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
                alert( nome + " cadastrado com sucesso!")
            }
        }
        req.open("POST" , "http://localhost:8001/product" , true)
        req.setRequestHeader( "Content-type" , "application/x-www-form-urlencoded" )
        
        req.send("nome=" + nome + "&preco=" + preco)

    }
   
}


function listar(){
    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            const tabela = document.getElementById("tblProdutos")
            const produtos = JSON.parse( this.responseText )

            produtos.forEach( prod => {
                if( document.getElementById( "p" + prod.id ) == null ){
                    var linha = tabela.insertRow( -1 )
                    linha.id = "p" + prod.id
                    cellId = linha.insertCell( 0 )
                    cellNome = linha.insertCell( 1 )
                    cellPreco = linha.insertCell( 2 )
                    cellExcluir = linha.insertCell( 3 )

                    cellId.innerHTML = prod.id
                    cellNome.innerHTML = prod.nome
                    cellPreco.innerHTML = prod.preco
                    cellExcluir.innerHTML = '<button class="btn btn-danger" onclick="excluir('+prod.id+')"> X </button>'
                }
            })

        }
    }
    req.open("GET" , "http://localhost:8001/product", true)
    req.send()
}