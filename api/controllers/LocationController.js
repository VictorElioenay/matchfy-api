/**
 * LocationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    update : async (req,res) => {
        const user = req.body

        const isOk = await UserLocation.updateOne({ user_id : user.user_id })
        .set({
            lat : user.lat,
            lon : user.lon 
        })

        return res.json({update : isOk ? true : false})
    },

    select : async (req,res) => {
        const id = req.param('id')

        const location = await UserLocation.findOne({ user_id : id })
        if(location.length != 0)
            return res.json({location})
        else
            return res.json({location:undefined})
    }
};

