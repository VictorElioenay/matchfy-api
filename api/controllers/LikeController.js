/**
 * LikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    like : (req,res) => { //Chamado quando um Like ocorrer
        
        sails.log.info("LikeController action Like");

        const body = req.body.data;
        const user = body.user;
        const target = body.target;
        const sql = "insert into likes(user_id, like_id) values ( " + user.id + "," + target.id + " )";
        
        
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {
           
            if( !err ){

                sails.log.info(resul);

                const sql = "select * from likes where user_id = " + target.id + 
                " and like_id = " + user.id + " union select * from superLikes where user_id = " + target.id + " and superlike_id = " + user.id ;
               
                sails.getDatastore("banco_dados").sendNativeQuery(sql, (err,resul) =>{

                    if( !err ){

                        sails.log.info(resul);

                        if(resul.rowCount != 0){
                            const matchController = require("./MatchController");
                            matchController.match(user.id,target.id,res);
                        }
                        else {
                            return res.json({ like : true, match : false });
                        }
                    }
                    else {
                        sails.log.info(err);
                        return res.json({ like :true, match : false });
                    }
                });                
            }
            else {
                sails.log.info(err);
                return res.json({ like : false });
            }
        }); 
    },

    superLike : (req,res) => { //Chamado quando um SuperLike ocorrer

        sails.log.info("LikeController action SuperLike");

        const body = req.body.data;
        const user = body.user;
        const target = body.target;
        const sql = "insert into superLikes(user_id, superLike_id) values ( " + user.id + "," + target.id + " )";
        
        
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {
           
            if( !err ){
                
                sails.log.info(resul);

                const sql = "select * from likes where user_id = " + target.id + 
                " and like_id = " + user.id + " union select * from superLikes where user_id = " + target.id + " and superlike_id = " + user.id ;
                
                sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) =>{

                    if( !err ){

                        sails.log.info(resul);

                        if(resul.rowCount != 0){
                            const matchController = require("./MatchController");
                            matchController.match(user.id,target.id,res);
                        }
                        else {
                            return res.json({ like : true, match : false });
                        }
                    }
                    else {
                        sails.log.info(err);
                        return res.json({ like : true, match : false });
                    }
                });                
            }
            else {
                sails.log.info(err);
                return res.json({ like : false });
            }
        }); 
    },
    
    deslike : (req,res) => {//Chamado quando um deslike ocorrer

        sails.log.info("LikeController action deslike");

        const body = req.body.data;
        const user = body.user;
        const target = body.target;
        const sql = "insert into deslikes(user_id, deslike_id) values ( " + user.id + "," + target.id + " )";

        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {

            if(!err){
                sails.log.info(resul);
                return res.json({ deslike : true });
            } else {
                sails.log.info(err);
                return res.json({ deslike : false });
            }

        });
    }
};

