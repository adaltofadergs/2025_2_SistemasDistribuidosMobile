function lerDados(){
    const divConteudo = document.getElementById("conteudo")
    const req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        console.log("readyState atual: " + this.readyState )
        divConteudo.innerHTML = "Carregando..."
        if( this.readyState == 4 ){
            if( this.status == 200){
                divConteudo.innerHTML = this.responseText
            }
            if(this.status == 404){
                divConteudo.innerHTML = this.status + " - " + this.statusText
            }
        }
    }
    req.open("GET" , "dados.txt", true)
    req.send()
}


function gerarNumeros(){
    const divNumeros = document.getElementById("divNumeros")
    const req = new XMLHttpRequest()

    req.onreadystatechange = function(){
        console.log("readyState atual: " + this.readyState )
        divNumeros.innerHTML = "Carregando..."
        if( this.readyState == 4 ){
            if( this.status == 200){
                divNumeros.innerHTML = this.responseText
            }
            if(this.status == 404){
                divNumeros.innerHTML = this.status + " - " + this.statusText
            }
        }
    }
    numero = document.getElementById("txtNumero").value
    req.open("GET" , "servidor.php?valor=" + numero,  false)
    req.send()
}

const divAnimada = $("#divAnimada")
divAnimada.css("background" , "#F00" )
divAnimada.css( "height" , "100px" )
divAnimada.css( "width" , "100px" )

function animar(){
    const largura = $("#txtLargura").val()
    divAnimada.css( "width" , "" +largura+"px" )
    divAnimada.fadeToggle( largura * 10 )

}