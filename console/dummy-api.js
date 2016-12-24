const rp = require('request-promise');
const baseUrl = 'https://api-dev.flyvictor.com';

exports.searchAirports = function( query ){
  var opts = {
    oauth: {
      consumer_key: 'legacy-application',
      consumer_secret: 'kfJyFWwUB3ZXNr0KC!vRz$'
    },
    uri: baseUrl + '/airports/find',
    qs: {
      searchText: query,
    },
    headers: {
      'User-Agent': 'Request-Promise',
      'userAuthToken': '7b74cdee6c91127547d2f123af87775d13bd7b8b137e2974620fb023be0bb77acfc2a28b44950d551e1175c850b7448f937f8ef68bcbd89f5520531f3cebc057153ee743827371f937e663bdbf17e7df89d90b89712f2b9331961ee47efe238880857141a9fec79a9c67337760b95f82',
    },
    json: true
  };

  return rp( opts ).then( function( data ){
    return data.destinations;
  }).catch( function( err ){
    console.err( "Problem retrieving airports" );
    return [];
  });
}
