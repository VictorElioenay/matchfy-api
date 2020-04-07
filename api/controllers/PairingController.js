/**
 * PairingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    pairing : (req,res) => {

        sails.log.info("PairingController action Pairing");

        const user_id = req.param("id");
        const sql = "select u.lat, u.long, u.idade, pr.* from usuarios as u " +
                       "inner join preferencias as pr on u.id = pr.id " +
                            "where u.id ="+user_id;

        let user_idade, user_lat, user_long, pref_idadeMax, pre_idadeMin, dist_max, interesse;

        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{
            if(err) {
                sails.log.info(err);
            }
            else {
                sails.log.info(resul);
                
                resul = resul.rows[0];

                user_idade = resul.idade;
                user_lat = resul.lat;
                user_long = resul.long;
                pref_idadeMax = resul.idade_max;
                pre_idadeMin = resul.idade_min;
                dist_max = resul.dist_max*1000;
                interesse = resul.interesse;

                const sql = "select * from usuarios where (idade - "+ pre_idadeMin +") >= 0 and idade <= "+ pref_idadeMax + 
                                " and earth_distance(ll_to_earth(lat, long),ll_to_earth("+user_lat+","+ user_long+")) <= "+ dist_max +
                                    " and id !=" + user_id +
                                        " order by ( abs(idade-"+user_idade+") + earth_distance(ll_to_earth(lat, long),ll_to_earth("+user_lat+","+ user_long+")) )" 											  
            
                sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{
                    if(!err){
                        // console.log( resul );
                        res.json( resul );//Retornar o resultado da consulta ao banco
                    }
                    else {
                        // console.log(err);
                        res.json( err );//Retornar o erro ocorrido durante a consulta ao banco
                    }
                })
            }
        });
    }
};

