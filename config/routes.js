
module.exports.routes = {

  "GET /v1/health" : "HealthController.health",
  "POST /v1/callback" : "CallbackController.profile",
  "PUT /v1/callback" : "CallbackController.updateProfileLocation",
  "POST /v1/like" : "LikeController.like",
  "POST /v1/superLike" : "LikeController.superLike",
  "POST /v1/deslike" : "LikeController.deslike",
  "POST /v1/accessRequest" : "ChatController.accessRequest",
  "POST /v1/chat" : "ChatController.addMsg",
  "POST /v1/getMsgs" : "ChatController.getMsgs",
  "GET /v1/match" : "MatchController.select",
  "DELETE /v1/match" : "MatchController.delete",
  "GET /v1/pairing" : "PairingController.pairing",
  "POST /v1/updateInterest"  : "CallbackController.updateProfileInterest",
  "POST /v1/uploadFile" : "FilesController.upload",
  "POST /v1/downloadFile" : "FilesController.download",
  "GET /v1/getFiles" : "FilesController.getFiles",
  "POST /v1/updateBio" : "CallbackController.updateBio",
  "POST /v1/getBio" : "CallbackController.getBio"
  
};
