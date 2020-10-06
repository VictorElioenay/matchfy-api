/*
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  default: {

    adapter : "sails-postgresql",
    url: "postgresql://postgres:setembro7@localhost:5432/match-fy"

  },
};
