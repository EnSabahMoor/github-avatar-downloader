var request = require('request');
var fs = require('fs');
var token = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
        'User-Agent': 'request',
        'Authorization': token.GITHUB_TOKEN
      }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body)
    cb(err, data);
  });
}

function objBuilder(err, result) {
  if (err) {
    console.log("Errors:", err);
  }
  else {
    var list = result.map(function (obj) {
      return {
        user: obj.login,
        url: obj.avatar_url
      }
    });
  }
  console.log(list)
}

getRepoContributors("jquery", "jquery", objBuilder);
