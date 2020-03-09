/**
 * PairingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    paring : (req,res) => {

        const userIdade = 19;
        const c1 = 0.5/40.0;//Constante para auxílio. 0,5/( Diferença de Idade Máxima)
        const c2 = 0.5/20.0;//Constante para auxílio. 0,5/(Distância Máxima Entre Dois Pontos)
        const lat = -21.783205, lon = -46.567724;//Dados a receber do Front

        //Função de Match
        const sql = "select * from usuarios order by ( abs( idade - " + userIdade + " )* " + c1 
        + " + earth_distance(ll_to_earth(lat, long),ll_to_earth(" + lat + "," + lon + ")) * " + c2 + " );" ;

        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {

            if(!err){
                console.log( resul );
                res.json( resul );//Retornar o resultado da consulta ao banco
            }
            else {
                console.log(err);
                res.json( err );//Retornar o erro ocorrido durante a consulta ao banco
            }
        });

    }

};

