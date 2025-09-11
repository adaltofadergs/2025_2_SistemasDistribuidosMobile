<?php
    header("Content-type: application/json");
    $local = "localhost";
    $user = "root" ;
    $password = "" ;
    $banco = "loja_25_2";

    if( isset($_REQUEST["buscar"]) ){
        $conn = mysqli_connect($local, $user, $password, $banco);
        if( $conn ){
            $query = "SELECT * FROM produto ORDER BY nome";
            $result = mysqli_query( $conn , $query );
            $linhas = array();
            while( $row = mysqli_fetch_assoc($result)){
                $linhas[] = $row;
            }
            echo ' { "produtos" : '. json_encode($linhas).' } ';
        }else{
            echo ' { "erro" : "Erro ao tentar conectar no banco de dados"} ';
        }
    }

    if( isset($_REQUEST["inserir"]) ){
        $conn = mysqli_connect($local, $user, $password, $banco);
        if( $conn ){
            $nome = $_POST["name"];
            $preco = $_POST["price"];
            $query = "INSERT INTO produto (nome, preco) VALUES ( '$nome' , $preco  )";
            mysqli_query( $conn , $query );
            $id = mysqli_insert_id($conn);
            
            echo ' { "resposta" : "Produto cadastrado!" , "idGerado" : '.$id.' } ';
        }else{
            echo ' { "resposta" : "Erro ao tentar conectar no banco de dados"} ';
        }
    }

    if( isset($_REQUEST["excluir"]) ){
        $conn = mysqli_connect($local, $user, $password, $banco);
        if( $conn ){
            $idProd = $_GET["idProduto"];
            $query = "DELETE FROM produto WHERE id = $idProd";
            mysqli_query( $conn , $query );
            
            echo ' { "resposta" : "Produto removido com sucessso!"  } ';
        }else{
            echo ' { "resposta" : "Erro ao tentar conectar no banco de dados"} ';
        }
    }