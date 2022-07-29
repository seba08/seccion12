const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify( token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
  });
  const payload = ticket.getPayload();
  //const userid = payload['sub'];
  console.log(payload)
}
//verify().catch(console.error);

module.exports = {
    verify
}