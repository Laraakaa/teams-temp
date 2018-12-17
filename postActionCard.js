let request = require('request');

if (config.proxy && config.proxy.length !== 0) {
  request = requestDefault.defaults({
    proxy: config.proxy
  });
}

const postActionCard = (actionCard) => {
  return new Promise((resolve, reject) => {
    hooks.forEach(hook => {
      request.post({
        url: hook.url,
        body: actionCard,
        json: true
      }, (error, response, body) => {
        if (error) {
          console.log(error);
          return;
        }
        if (response.statusCode === 200) {
          console.log("Action Card posted to hook '" + hook.name + "'");
          resolve();
        } else {
          console.log("Error while posting to webhook: " + body);
          reject(body);
        }
      });
    });
  });
}

module.exports = postActionCard;
