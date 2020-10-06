/**
 * SettingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    update : async (req,res) => {
        const user = req.body

        const isOk = await UserSettings.updateOne({ user_id : user.user_id })
        .set({
            sexo : user.sexo,
            idade : user.idade,
            bio : user.bio       
        })

        return res.json({update : isOk ? true : false})
    },

    select : async (req,res) => {
        const id = req.param('id')

        const settings = await UserSettings.findOne({ user_id : id })
        if(settings.length != 0)
            return res.json({settings})
        else
            return res.json({settings:undefined})
    }
};

