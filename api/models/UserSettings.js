/**
 * UserSettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id : { model : 'users', unique : true },
    sexo : { type : 'string', required : true },
    bio : { type : 'string', defaultsTo: '' },
    idade : { type : 'number', required : true },
    picture : { type : 'string', required : true }
  },
};

