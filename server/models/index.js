var db = require('../db');
var Promise = require('bluebird');

var checkUser = (username) => {
  return new Promise((fulfill, reject) => {
    db.query(`SELECT id FROM users WHERE username = ${db.escape(username)};`, (err, results, fields) => {

      if (err) {
        reject(err);
      } else {
        fulfill(results.length !== 0 ? results[0].id : undefined);
      }

    });
  });
};

var insertUser = (username) => {
  return new Promise((fulfill, reject) => {
    var query = `INSERT INTO users (username) VALUES (${db.escape(username)});`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        fulfill(results.insertId);
      }
    });
  });
};

var checkRoom = (roomname) => {
  return new Promise((fulfill, reject) => {
    db.query(`SELECT id FROM rooms WHERE roomname = ${db.escape(roomname)};`, (err, results, fields) => {
      
      if (err) {
        reject(err);
      } else {
        fulfill(results.length !== 0 ? results[0].id : undefined);
      }

    });
  });
};

var insertRoom = (roomname) => {
  return new Promise((fulfill, reject) => {
    var query = `INSERT INTO rooms (roomname) VALUES (${db.escape(roomname)});`;
    db.query(query, (err, results, fields) => {
      
      if (err) {
        reject(err);
      } else {
        fulfill(results.insertId);
      }

    });
  });
};

var insertMessage = (message, userId, roomId) => {
  return new Promise((fulfill, reject) => {
    var query = `INSERT INTO messages (message, user_id, room_id) VALUES (${db.escape(message)}, ${userId}, ${roomId});`;
    db.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        fulfill(results.insertId);
      }

    });
  });
};

module.exports = {
  messages: {
    get: () => {
      
      var query = 'SELECT m.message AS text, m.id AS objectId, r.roomname, u.username ';
      query += 'FROM users u INNER JOIN messages m ON m.user_id = u.id ';
      query += 'INNER JOIN rooms r ON r.id = m.room_id ';
      query += 'ORDER BY m.id DESC;';

      return new Promise((fulfill, reject) => {
        db.query(query, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            fulfill(results);
          }
        });
      });
    }, 

    post: (body) => {

      var username = body.username;
      var roomname = body.roomname;
      var message = body.message;

      // Use promise.all to get userID and roomID to insert message
      return Promise.all([
        checkUser(username).then(id => {
          if (id) {
            return id;
          } else {
            return insertUser(username);
          }
        }),
        checkRoom(roomname).then(id => {
          if (id) {
            return id;
          } else {
            return insertRoom(roomname);
          }
        })
      ])
      .then(([userId, roomId]) => {
        return insertMessage(message, userId, roomId);
      });

    } 
  },

  users: {
    get: () => {

    },

    post: (username) => {
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

