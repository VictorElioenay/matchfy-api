/**
 * FilesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    upload : (req,res) => {
        
        sails.log.info("FilesController action Upload")
        
        const user_id = req.body.id;
      
        req.file("imagens").upload(
            {
                dirname : require("path").join(process.cwd(),"users_images",user_id)
            },
            (err,files)=>{
                if(err)
                    sails.log.info(err);
                else
                    sails.log.info(files);
                return res.send("Ok");
        })
    },

    download : (req,res) => {

        sails.log.info("FilesController action DonwloadFiles");

        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();
   
        res.attachment("imagem.jpg");
       
        fileAdapter.read(req.body.nameFile)
        .on('error', function (err){
            return res.serverError(err);
        })
        .pipe(res);
        
     },

    getFiles : (req,res) => {

        sails.log.info("FilesController action GetFiles")

        var user_id = req.param("id");
        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();

        fileAdapter.ls(require("path").join(process.cwd(),"users_images",user_id), (err,files) => {
            if(err)
                return res.json({ err : true })
            else
                return res.json(files)
        })
    }

};

