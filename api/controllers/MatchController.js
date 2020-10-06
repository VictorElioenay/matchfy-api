
module.exports = {

    delete : async (req,res) => { //Deletar um match ocorrido
        
        sails.log.info("MatchController action Delete");

        const ids = req.body
        await Matchs.destroy({
            where : {
                or : [
                    { user_id1 : ids.user_id },
                    { user_id2 : ids.user_id }
                ],
                or : [
                    { user_id1 : ids.target_id },
                    { user_id2 : ids.target_id }
                ]                 
            }
        })

        return res.json({delete:true})
    },

    select : async (req,res) => { //Retornar todos os matchs para um determinado usuário

        sails.log.info("MatchController action Select");
        const user_id = req.param("id");

        let matchs = await Matchs.find({
            where : {
                or : [
                    { user_id1 : user_id },
                    { user_id2 : user_id }
                ]
            }
        })

        return res.json({matchs})
    }
};

