CREATE DATABASE loja_25_2;
USE loja_25_2;
CREATE TABLE produto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(50) NOT NULL ,
    preco DOUBLE
);

INSERT INTO produto (nome, preco) VALUES 
( "Coca-Cola" , 9.89 ) ,
( "Pepsi" , 7.59 ) ,
( "Trakinas" , 3.99 ); 


-- Alterações do dia 15/10/2025
CREATE TABLE categoria (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(50) NOT NULL
);

ALTER TABLE produto ADD COLUMN codCategoria INT;

ALTER TABLE produto ADD CONSTRAINT 
FOREIGN KEY (codCategoria) REFERENCES categoria( id ); 

INSERT INTO categoria (nome) VALUES 
( "Bebidas" ) ,
( "Alimentos" ) ,
( "Limpeza" );

UPDATE produto SET codCategoria = 1 WHERE id IN(4, 5, 6) ;
UPDATE produto SET codCategoria = 2 WHERE id = 8 ;