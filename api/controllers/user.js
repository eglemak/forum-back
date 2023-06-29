const uniqid = require("uniqid");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.SIGN_UP = async (req, res) => {

    const email = req.body.email;
    const hasAtSymbol = email.includes("@");  // tikrina ar turi @ simboli
    if (!hasAtSymbol) {
      return res.status(400).json({ response: "Wrong email" });
    }
  
    const pass = req.body.password;
    if (pass.length < 6 || !(/\d/.test(pass))) { 
      return res.status(400).json({ response: "Password must have 6 or more characters, with at least one of them being a number." });
    } 
  
    let newName = req.body.name;   // pakeisti vardo pirma raide i didziaja
    newName = newName.charAt(0).toUpperCase() + newName.slice(1); 
    
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
  
      const user = new UserModel({
        id: uniqid(),
        name: newName,
        email: req.body.email,
        password: hash,
        bought_tickets: [],
        money_balance: req.body.money_balance,
      });
  
      await user.save();
  
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        {
          algorithm: "RS256",
        }
      );
  
      const refreshToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        {
          algorithm: "RS256",
        }
      );
  
      return res.status(200).json({ response: "You signed up", jwt_token: token, refresh_token: refreshToken });
  
    } catch (err) {
      res.status(500).json({ response: "User was not saved, please try later" });
    }
  };
  
  
  
  
  
  module.exports.LOGIN = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({ response: "Bad data" });
      }
  
      bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            {
              algorithm: "RS256",
            }
          );
          const refreshToken = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" },
            {
              algorithm: "RS256",
            }
          );
  
          return res.status(200).json({ response: "You logged in", jwt: token, jwt_refresh: refreshToken });
        } else {
          return res.status(404).json({ response: "Bad data" });
        }
      });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).json({ response: "ERROR, please try later" });
    }
  };