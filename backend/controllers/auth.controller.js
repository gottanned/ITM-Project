const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require("nodemailer");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          console.log(user.roles);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          var transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "giftcardservice.beta@gmail.com",
              pass: "wper jnrc uesl sqau",
            },
          });

          var mailOptions = {
            from: "giftcardservice.beta@gmail.com",
            to: req.body.email,
            subject: "Welcome to Giftcard Service!",
            text: `Congratulations! You have successfully registered to Giftcard Service. You can now start selling your giftcards.`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).send({
                message:
                  "User was registered successfully and a confirmation was sent to your email!",
              });
            }
          });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  console.log("signin");
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign(
        { id: user.id, username: req.body.username },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

exports.sendOTP = (req, res) => {
  console.log("sendOTP");
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    var date = new Date();
    user.otpExpires = date.setMinutes(date.getMinutes() + 10);

    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      var transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "giftcardservice.beta@gmail.com",
          pass: "wper jnrc uesl sqau",
        },
      });

      var mailOptions = {
        from: "giftcardservice.beta@gmail.com",
        to: req.body.email,
        subject: "OTP for password reset",
        text: `Your OTP is ${otp}, and it is valid for 10 minutes, at ${date}, and current date is ${new Date()}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: error });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send({ message: "OTP sent successfully!" });
        }
      });
    });
  });
};

exports.verifyOTP = (req, res) => {
  console.log("verifyOTP");
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    var currentOTP = user.otp;
    var currOTPexp = user.otpExpires;
    var date = new Date();
    console.log(req.body.otp, currentOTP, currOTPexp, date);
    if (currentOTP === req.body.otp && currOTPexp > date) {
      res.status(200).send({ message: "OTP verified successfully!" });
    } else if (currOTPexp < date) {
      res.status(403).send({ message: "OTP expired!" });
    } else {
      res.status(403).send({ message: "Invalid OTP!" });
    }
  });
};

exports.resetPassword = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.password !== req.body.confirmPassword) {
      res.status(403).send({ message: "Passwords do not match!" });
      return;
    }
    var currentOTP = user.otp;
    var currOTPexp = user.otpExpires;
    var date = new Date();
    console.log(req.body.otp, currentOTP, currOTPexp, date);
    if (currentOTP === req.body.otp && currOTPexp > date) {
      user.password = bcrypt.hashSync(req.body.password, 8);
      user.otp = "";
      user.otpExpires = null;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: "Password reset successfully!" });
      });
    } else if (currOTPexp < date) {
      res.status(403).send({ message: "OTP expired!" });
    } else {
      res.status(403).send({ message: "Invalid OTP!" });
    }
  });
};
