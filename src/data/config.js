import Cloudant from 'cloudant';

var config = {
  username: '701b5a20-b241-4286-b767-8173b8566bfd-bluemix',
  password: '5b4d879c5c725d8c2e0639bc7af7ac19b6b7440e3a992f3bc87859e6f274b9ad',
  host: '701b5a20-b241-4286-b767-8173b8566bfd-bluemix.cloudant.com',
  port: 443,
  url:
    'https://701b5a20-b241-4286-b767-8173b8566bfd-bluemix:5b4d879c5c725d8c2e0639bc7af7ac19b6b7440e3a992f3bc87859e6f274b9ad@701b5a20-b241-4286-b767-8173b8566bfd-bluemix.cloudant.com',
};

var cloudant = Cloudant(config);
console.log(cloudant.db);

export { cloudant };
