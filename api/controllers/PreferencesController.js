/**
 * PreferencesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    update : async (req,res) => {
        const user = req.body

        const isOk = await UserPreferences.updateOne({ user_id : user.user_id })
        .set({
            sexo : user.sexo,
            idadeMin : user.idadeMin,
            idadeMax : user.idadeMax,
            dist : user.dist            
        })

        return res.json({update : isOk ? true : false})
    },

    select : async (req,res) => {
        const id = req.param('id')

        const preferences = await UserPreferences.findOne({ user_id : id })
        if(preferences.length != 0)
            return res.json({preferences})
        else
            return res.json({preferences:undefined})
    }
};

