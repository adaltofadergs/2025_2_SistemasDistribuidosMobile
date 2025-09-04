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


