
var fs = require("fs");
const { use } = require("passport");
var path = require("path");

module.exports = {
    
    create : (user1,user2) => {
        let file = path.join(process.cwd(),"mensagens",user1+"_"+user2+".txt");
        fs.writeFile(file,"",(err)=>{
            if(err)
                return false;
            return true;
        })
    },

    delete : (req,res) => {
    
    },
    
    accessRequest : async (req,res) => {

        const user_id = req.body.user_id;
        const target_id = req.body.target_id;

        const match = await Matchs.findOne({ 
            or:[
                {user_id1 : user_id},
                {user_id2 : user_id},
            ],
            or:[
                {user_id1 : target_id},
                {user_id2 : target_id},
            ]
        })

        const path1 = path.join(process.cwd(),"mensagens",match.user_id1+"_"+match.user_id2+".txt");

        if( fs.existsSync(path1) ){
            sails.sockets.join(req,match.user_id1+"_"+match.user_id2);
            return res.json({ access : true });
        }

        res.json({ access : false });
    },

    addMsg : async (req,res) => {
        
        const user_id = req.body.user_id;
        const target_id = req.body.target_id;
        
        const match = await Matchs.findOne({ 
            or:[
                {user_id1 : user_id},
                {user_id2 : user_id},
            ],
            or:[
                {user_id1 : target_id},
                {user_id2 : target_id},
            ]
        })

        const text = user_id + ":" + req.body.text + "(EOF)";
        const path1 = path.join(process.cwd(),"mensagens",match.user_id1+"_"+match.user_id2+".txt");

        if( fs.existsSync(path1) ){
            fs.appendFile(path1,text,(err)=>{
                if(err)
                    return res.json({err : true});
                sails.sockets.broadcast(match.user_id1+"_"+match.user_id2,{text});
                return res.json({err : false});
            });
        }
    },

    getMsgs : async (req,res) => {

        const user_id = req.param('user_id');
        const target_id = req.param('target_id');

        const match = await Matchs.findOne({ 
            or:[
                {user_id1 : user_id},
                {user_id2 : user_id},
            ],
            or:[
                {user_id1 : target_id},
                {user_id2 : target_id},
            ]
        })

        const path1 = path.join(process.cwd(),"mensagens",match.user_id1+"_"+match.user_id2+".txt");

        if( fs.existsSync(path1) ){
            fs.readFile(path1,"utf8",(err,data)=>{
                if(err)
                    return res.json({mensagens:undefined});
                return res.json({mensagens:data});
            })          
        }
    } 
};

