/**
 * PairingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    pairing : async (req,res) => {

        sails.log.info("PairingController action Pairing");

        const user_id = req.param("id");
        var preferences = await UserPreferences.findOne({user_id:user_id})
        var location = await UserLocation.findOne({user_id:user_id})

        let deslikesIds = await Deslikes.find({ 
            where : {
                user_id : user_id
            },
            select : ['target_id']
        })
        
        deslikesIds = deslikesIds.map((values)=>{
            return values.target_id
        })

        var usersIds = await UserSettings.find({
            where : {
                'idade' : { '<=' : preferences.idadeMax, '>=' : preferences.idadeMin },
                'sexo' : preferences.sexo,
                'user_id' : { '!=' : [user_id,...deslikesIds] } 
            },
            select : ['user_id']    
        })
        
        usersIds = usersIds.map((value)=>{
            return value.user_id
        })
    
        const sql = 'select user_id from userlocation where user_id in ('+usersIds+') and '+
        'earth_distance(ll_to_earth(lat, lon),ll_to_earth('+location.lat+','+location.lon+')) <='+preferences.dist
        
        sails.getDatastore('default').sendNativeQuery(sql,async (err,resul)=>{
            if(err)
                return res.json({pairing:undefined})

            let ids = resul.rows.map((values)=>{
                return values.user_id
            })

            let pairing = await Users.find({ 
                where : { 
                    id : ids 
                },
                select : ['name']
            }).populate('settings')
            
            return res.json({pairing})
        })
    }
}
