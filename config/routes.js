
module.exports.routes = {

  "GET /v1/health" : "HealthController.health",
  "POST /v1/callback" : "CallbackController.profile",
  "POST /v1/like" : "LikeController.like",
  "POST /v1/superLike" : "LikeController.superLike",
  "POST /v1/deslike" : "LikeController.deslike",
  //"POST /v1/chatrequest" : "",
  "GET /v1/match" : "MatchController.select",
  "DELETE /v1/match" : "MatchController.delete"
};
