/**
 * LikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ChatController = require("./ChatController");

module.exports = {

    like : async (req,res) => { 
        
        var data = req.body
        try {
            await Likes.create({ user_id : data.user_id, target_id : data.target_id })
            let likes = await SuperLikes.find({ user_id : data.target_id, target_id : data.user_id })
            let supers = await Likes.find({ user_id : data.target_id, target_id : data.user_id })
           
            if(likes.length != 0 || supers.length != 0){
                await Matchs.create({ user_id1 : data.user_id, user_id2 : data.target_id })
                
                ChatController.create(data.user_id,data.target_id)

                return res.json({like:true,match:true})
            }
            
            return res.json({like:true,match:false})

        } catch(error) {
            return res.json({like:false,match:false})
        }
    },
    
    select : async (req,res) => {
        
        var id = req.param('id')

        var likes = await Likes.find({ where : { user_id : id }, select : ['target_id'] })
        return res.json({likes})
    }
};

