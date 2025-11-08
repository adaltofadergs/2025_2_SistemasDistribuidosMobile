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