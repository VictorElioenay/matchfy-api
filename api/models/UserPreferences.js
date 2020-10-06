/**
 * UserPreferences.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id : { model : 'users', unique : true },
    sexo : { type : "string", defaultsTo : "noPreference" },
    idadeMin : { type : 'number', required : true },
    idadeMax : { type : 'number', required : true },
    dist : { type : 'number', required : true }
  },
};

