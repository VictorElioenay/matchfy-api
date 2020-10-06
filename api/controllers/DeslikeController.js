/**
 * DeslikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    deslike : async (req,res) => {
        
        var data = req.body
        try {
            await Deslikes.create({ user_id : data.user_id, target_id : data.target_id })
        } catch(error) {
            return res.json({deslike:false})
        }
        return res.json({deslike:true})
    },
    
    select : async (req,res) => {
        
        var id = req.param('id')

        var deslikes = await Deslikes.find({ where : { user_id : id }, select : ['target_id'] })
        return res.json({deslikes})
    }
};

