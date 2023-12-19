const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
  token: {
    type: String,
    required: true,
  },
});

// Generate hash for password and confirmPassword fields before saving
userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password") || user.isNew) {
    const saltRounds = 10; // Number of salt rounds to generate
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;

        // Now, generate the hash for confirmPassword
        bcrypt.hash(user.confirmPassword, salt, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.confirmPassword = hash;
          next();
        });
      });
    });
  } else {
    next();
  }
});

//Checking confirm password matched or not
userSchema.methods.comparePassword = function (givenPassword, callback) {
  bcrypt.compare(givenPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// userSchema.methods.generateToken = function (cb) {
//   var user = this;
//   var token = jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET);
//   user.token = token;
//   user.save(function (err, user) {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

// userSchema.statics.findByToken = function (token, cb) {
//   var user = this;
//   jwt.verify(token, process.env.TOKEN_SECRET, function (err, decode) {
//     user.findOne({ _id: decode, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

const User = mongoose.model("user", userSchema);

module.exports = User;
