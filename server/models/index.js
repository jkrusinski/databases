var db = require('../db');
var Promise = require('bluebird');

var checkUser = function (username) {
  return new Promise((fulfill, reject) => {
    db.query(`SELECT id FROM users WHERE username = '${username}';`, (err, results, fields) => {

      if (err) {
        reject(err);
      } else {
        fulfill(results != false ? results[0].id : undefined);
      }

    });
  });
};

var insertUser = function(username) {
  return new Promise(function(fulfill, reject) {
    db.query(`INSERT INTO users (username) VALUES ('${username}');`, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        fulfill(results[0].id);
      }
    });
  });
};

var checkRoom = function(room) {
  return new Promise(function(fulfill, reject) {
    db.query(`SELECT id FROM rooms WHERE roomname = '${roomname}';`, (err, results, fields) => {
      
      if (err) {
        reject(err);
      } else {
        fulfill(results != false ? results[0].id : undefined);
      }

    });
  });
};

var insertRoom = function(room) {
  return new Promise(function(fulfill, reject) {
    db.query(`INSERT INTO rooms (roomname) VALUES ('${roomname}');`, (err, results, fields) => {
      
      if (err) {
        reject(err);
      } else {
        fulfill(results[0].id);
      }

    });
  });
};

var insertMessage = (message, userId, roomId) => {
  return new Promise((fulfill, reject) => {
    db.query(`INSERT INTO messages (message, user_id, room_id) VALUES ('${message}', ${userId}, ${roomId});`, (err, results, fields) => {

      if (err) {
        reject(err);
      } else {
        fulfill(results[0].id);
      }

    });
  });
};

module.exports = {
  messages: {
    get: function () {
      console.log('All messages: ', db.query('SELECT * FROM messages;'));
    }, 

    post: function (body) {

      var username = body.username;
      var roomname = body.roomname;
      var message = body.message;

      // Use promise.all to get userID and roomID to insert message

    } 
  },

  users: {
    // Ditto as above.
    get: function () {},

    post: function (username) {
      return checkUser(username).then((id) => {
        if (!id) {
          return insertUser(username);
        } else {
          return id;
        }
      });
    }
  }
};

