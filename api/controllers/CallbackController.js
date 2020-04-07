
function cadastrar(user,res){

    sails.log.info("Cadastro");

    //Insere os dados recebidos no banco
    var sql = "insert into usuarios( nome, email, idade, picture ) values('" + user.name + "','" + 
    user.email + "'," + user.idade + ",'" + user.picture.data.url +"');";
    
    sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {
        
        if( err ){
            sails.log.info( err );
            return res.json({ cadastro : false, err : err });//Retorna um json informando que os dados foram cadastrados/inseridos no banco
        }
        else {
            sails.log.info(resul);

            sql = "select id from usuarios where email="+user.email;
            sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,result) => {
     
                sql = "insert into preferencias values("+result.rows[0].id+", default, default, default)";
                sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul) => {

                    sql = "insert into user_bio values("+result.rows[0].id+", default)"; 
                    sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resu)=>{
                        return res.json({ cadastro : true, id : result.rows[0].id });
                    }) 
                })
            })   
        }
    });
}

module.exports = {
    
    profile : (req,res) => {
        
        const user = req.body.data;
      
        sails.log.info("callback");
    
        const sql = "select id,email from usuarios where email = '" + user.email + "'";
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{

            if( err ) {
                sails.log.info( err );
                return res.json({ cadastro : false, err : err });
            }
            else {
                sails.log.info( resul );
                if( resul.rowCount == 0 )
                    cadastrar(user,res);
                else
                    return res.json({ cadastro : true , id : resul.rows[0].id });
            }
        });  
    },

    updateProfileLocation : (req,res) => {

        sails.log.info("Callback action updateProfileLocation");
        sails.log.info(req.body)

        const data = req.body.data;
 
        const sql = " update usuarios set lat="+data.lat+", long="+data.long+" where id ="+data.id+";";
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{
            if(err) {
                sails.log.info(err);
                res.json({ update : false })
            } 
            else {
                sails.log.info(resul);
                res.json({ update : true })
            }
        })

    },

    updateProfileInterest : (req,res) => {

        var pref = req.body.data;
        let interesse;
      
        if( pref.homens )
            if( pref.mulheres )
                interesse = "''";
            else
                interesse = "'homens'";
        else
            if( pref.mulheres )
                interesse = "'mulheres'";
            else
                interesse = "''";

        const sql = "update preferencias set dist_max = " + pref.dist + ", idade_min = " + pref.idade_min + 
                        ", idade_max = " + pref.idade_max + ", interesse = " + interesse + " where id =" + pref.id;
        // sails.log.info(sql);
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{
            if(err) {
                sails.log.info(err);
                res.json({ update : false })
            } 
            else {
                sails.log.info(resul);
                res.json({ update : true })
            }
        })
    },

    updateBio : (req,res) => {
        
        const sql = "update user_bio set bio = '" + req.body.bio + "' where id = " + req.body.id;
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{
            if(!err)
                return res.json({ update : true });
            return res.json({ update : false });
        })
    },

    getBio : (req,res) => {

        const sql = "select bio from user_bio where id = " + req.body.id;
        sails.getDatastore("banco_dados").sendNativeQuery(sql,(err,resul)=>{
            if(!err)
                return res.json({ bio : resul.rows[0].bio });
            return res.json({ err : true });
        })
    }
};

