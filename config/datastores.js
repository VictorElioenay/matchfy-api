/*
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  default: {

    // adapter: 'sails-mysql',
    // url: 'mysql://user:password@host:port/database',

  },

  banco_dados: {
    // Aqui vocês devem alterar a url de conexão com o banco de dados. 
    adapter : "sails-postgresql",
    url: "postgresql://postgres:setembro7@localhost:5432/teste"
  }


};
