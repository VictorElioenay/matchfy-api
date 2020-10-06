/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name : { type : 'string', required : true },
    email : { type : 'string', required : true, unique : true },
    preferences : { collection : 'userPreferences', via : 'user_id' },
    settings : { collection : 'userSettings', via : 'user_id' },
    location : { collection : 'userLocation', via : 'user_id' },
    likes : { collection : 'likes', via : 'user_id' },
    deslikes : { collection : 'deslikes', via : 'user_id' },
    superlikes : { collection : 'superlikes', via : 'user_id' },
  },
};

