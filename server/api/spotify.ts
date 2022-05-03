import axios from "axios"
// import FormData from "form-data"
import querystring from "querystring"
// var querystring = require('querystring');
// const FormData = require('form-data');

export default defineEventHandler(async (event) => {

  var client_id = '56a556e5220c4864b18a30a6e64656b3'; // Your client id
  var client_secret = '2210a51cc49d4465850cb50e2db78d03'; // Your secret

  let res = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
    grant_type: 'client_credentials', //gave the values directly for testing
  }), {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
  })


  let playing = await axios
    .get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization:
          'Bearer ' + res.data.access_token,
      },
    })

  console.log(playing);

  return {
    msg: "test"
  }
  return {
    playing: playing.data
  }


  // return {
  //   token: token.data
  // }
  // your application requests authorization
  // var authOptions = {
  //   url: 'https://accounts.spotify.com/api/token',
  //   headers: {

  //   },
  //   form: {
  //     grant_type: 'client_credentials'
  //   },
  //   json: true
  // };

  // request.post(authOptions, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {

  //     // use the access token to access the Spotify Web API
  //     var token = body.access_token;
  //     var options = {
  //       url: 'https://api.spotify.com/v1/users/jmperezperez',
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       },
  //       json: true
  //     };
  //     request.get(options, function (error, response, body) {
  //       console.log(body);
  //     });
  //   }
  // });

  console.log('New request: ' + event.req.url)
  return { msg: "test" }
})