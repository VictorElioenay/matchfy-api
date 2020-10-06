/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login : async (req,res) => {
        var email = req.body.email
        var user = await Users.find({email:email})
        .populate('preferences').populate('settings').populate('location')

        if( user.length != 0 ){
            return res.json({login:true})
        }
        return res.json({login:false})        
    },
    
    singin : async (req,res) => {
        
        const new_user = req.body
        try {
            var user = await Users.create({name:new_user.name,email:new_user.email}).fetch()
            await UserPreferences.create({sexo:'masculino',idadeMin:18,idadeMax:40,dist:20,user_id:user.id})
            await UserSettings.create({sexo:'masculino',idade:20,bio:undefined,picture:new_user.picture,user_id:user.id})
            await UserLocation.create({lat:0,lon:0,user_id:user.id})
            
            user = await Users.find({name:new_user.name})
            // .populate('preferences').populate('settings').populate('location')
            
            return res.json({singin:true})
            
        } catch (error) {
            return res.json({singin:false})
        }   
    }
};

