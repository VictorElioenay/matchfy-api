
var fs = require("fs");
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
    
    accessRequest : (req,res) => {

        const user_id = req.body.user_id;
        const target_id = req.body.target_id;
        const path1 = path.join(process.cwd(),"mensagens",user_id +"_"+target_id+".txt");
        const path2 = path.join(process.cwd(),"mensagens",target_id +"_"+user_id+".txt");

        if( fs.existsSync(path1) ){
            sails.sockets.join(req,user_id+"_"+target_id);
            return res.json({ access : true });
        }
        else if( fs.existsSync(path2) ){
            sails.sockets.join(req,target_id+"_"+user_id);
            return res.json({ access : true });
        }

        res.json({ access : false });
    },

    addMsg : (req,res) => {
        
        // if( req.body.id )
        sails.log.info(sails.sockets.getId(req));
        const user_id = req.body.user_id;
        const target_id = req.body.target_id;
        const text = user_id + ":" + req.body.text+"(EOF)";
        const path1 = path.join(process.cwd(),"mensagens",user_id +"_"+target_id+".txt");
        const path2 = path.join(process.cwd(),"mensagens",target_id +"_"+user_id+".txt");

        sails.log.info("id" + user_id + " ta_id" + target_id);
        sails.log.info(text);

        if( fs.existsSync(path1) ){
            fs.appendFile(path1,text,(err)=>{
                if(err)
                    return res.json({err : true});
                sails.sockets.broadcast(user_id +"_"+target_id,"change",{change : true});
                return res.json({err : false});

            });
        }
        else if( fs.existsSync(path2) ){
            fs.appendFile(path2,text,(err)=>{
                if(err)
                    return res.json({err : true});
                sails.sockets.broadcast(target_id +"_"+user_id,"change",{change : true});
                return res.json({err : false});
            });
        }
    },

    getMsgs : (req,res) => {

        const user_id = req.body.user_id;
        const target_id = req.body.target_id;
        const path1 = path.join(process.cwd(),"mensagens",user_id +"_"+target_id+".txt");
        const path2 = path.join(process.cwd(),"mensagens",target_id +"_"+user_id+".txt");

        if( fs.existsSync(path1) ){
            fs.readFile(path1,"utf8",(err,data)=>{
                if(err)
                    return res.json({err:true});
                return res.json({data:data});
            })          
        }
        else if( fs.existsSync(path2) ){
            fs.readFile(path2,"utf8",(err,data)=>{
                if(err)
                    return res.json({err:true});
                return res.json({data:data});
            })
        }
    } 

};

