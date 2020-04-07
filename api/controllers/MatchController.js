
module.exports = {

    match : (user1,user2,res) => { //Chamado quando um match ocorrer

        sails.log.info("MatchController action Match");

        const sql = "insert into match(user0_id, user1_id) values ( " + user1 +"," + user2 +" ) ";      
        sails.getDatastore("banco_dados").sendNativeQuery(sql, (err,resul) => {

            if( !err ){
                require("./ChatController").create(user1,user2);
                return res.json({ match : true });
            }
            else{
                sails.log.info(err);
                return res.json({ match : false });
            }
        });
    },
    
    delete : (req,res) => { //Deletar um match ocorrido
        
        sails.log.info("MatchController action Delete");

        const body = req.body.data;
        const user0 = body.user0.id;
        const user1 = body.user1.id;

        const sql = "delete from match where user0_id = " + user0 + " and user1_id = " + user1 + " or user0_id = " + user1 + " and user1_id = " + user0  ;
        sails.getDatastore("banco_dados").sendNativeQuery(sql, (err,resul) => {

            if( !err ) {
                return res.json({ delete : true });
            } else {
                return res.json({ delete : false });
            }           
        });
    },

    select : (req,res) => { //Retornar todos os matchs para um determinado usuário

        sails.log.info("MatchController action Select");
        const user_id = req.param("id");
        sails.log.info("user_id: " + user_id);

        var sql = "select user0_id as ID from match where user1_id = " + user_id + " union all select user1_id from match where user0_id = " + user_id;
        sails.getDatastore("banco_dados").sendNativeQuery(sql, (err,resul) => {

            sails.log.info(resul);
           
            if( !err ) {
                if( resul.rowCount != 0 ){

                    sql = "select id, nome, email, picture from usuarios where id = any(array[" + resul.rows[0].id;
                    for( let i = 1; i<resul.rowCount; i++ ){
                        sql += "," + resul.rows[i].id;
                    }
                    sql += "])";

                    sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {
                        
                        sails.log.info(resul)

                        if( !err )
                            return res.json({ list : true, results : resul.rows, count : resul.rowCount });
                        else
                            return res.json({ list : false });
                    });

                } else {
                    res.json({ list : false })
                }

            } else {
                return res.json({ list : false });
            }
        });
    }
};

