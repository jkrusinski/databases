var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {

      models.messages.get().then(results => {
        res.json({results: results});
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      console.log(req.body);

      models.messages.post(req.body).then(result => {
        res.sendStatus(201);
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},

    post: function (req, res) {

      var username = req.body.username;

      models.users.post(username).then((results) => {
        res.sendStatus(201);
      });
    }
  }
};

