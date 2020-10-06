/**
 * UserLocation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id : { model : 'users', unique : true },
    lat : { type : 'number', required : true },
    lon : { type : 'number', required : true }
  },
};

