import pkg from 'mongoose';
const { isValidObjectId } = pkg;
import Users from '../models/dbUsers.js';
import VerificationToken from '../models/verificationToken.js';
import { sendError } from '../utils/helper.js';
import { generateOTP } from '../utils/mailVer.js';
import { mailVerification } from '../utils/mailVer.js';
import { generateEmailTemplate } from '../utils/mailVer.js';
import bcrypt from 'bcrypt';

// API Logic
// FIXME:
// Implement a expiration for non verified users
export const createUser = async (req, res) => {
  const { name, email, password, states, emailVerified } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(500).json({ message: 'already an existing user' });
    } else {
      const user = new Users({ name, email, password, states, emailVerified });
      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP,
      });

      verificationToken.save();
      /*
      mailVerification().sendMail({
        from: 'verifyEmail@email.com',
        to: user.email,
        subject: 'Verify your email account',
        html: generateEmailTemplate(OTP),
      });
*/
      user.save((err) => {
        if (err) {
          res.status(501).send(err);
        } else {
          res.status(201).send(user);
        }
      });
    }
  });
};

// FIXME:
// Implement if user is not verified, they cannot log in
export const getUser = async (req, res) => {
  const { email, password, emailVerified } = req.body;
  //console.log(emailVerified);
  Users.findOne({ email: email }, (err, user) => {
    //const correctpass = await bcrypt.compare(password, user.password);
    //console.log(password);

    if (user) {
      if (user.emailVerified) {
        //console.log('Email Verified');
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) {
            throw error;
          } else if (!isMatch) {
            //console.log(password + '        ' + user.password);
            //console.log("Password doesn't match!");
            res.status(401).send({ message: '*Password is Incorrect*' });
          } else {
            //console.log(password + '        ' + user.password);
            //console.log('Password matches!');
            //local storeage send json
            //return res.json(user);
            res.status(202).send({ user: user });
          }
        });
      } else {
        //console.log('Email not Verified');
        res.status(403).send({ message: '*Email is not Verified*' });
      }
    } else {
      res.status(405).send({ message: '*User is not registered*' });
    }
  });
};

/*
export const googcreateUser = async (req, res) => {
  const { name, email, password, states } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(500).json({ message: "already an existing user" });
    } else {
      const user = new Users({ name, email, password, states });
      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP,
      });

      verificationToken.save();*/
/*
      mailVerification().sendMail({
        from: 'verifyEmail@email.com',
        to: user.email,
        subject: 'Verify your email account',
        html: generateEmailTemplate(OTP),
      });
*/
/*
      user.save((err) => {
        if (err) {
          res.status(501).send(err);
        } else {
          res.status(201).send(user);
        }
      });
    }
  });
};

// FIXME:
// Implement if user is not verified, they cannot log in
export const googgetUser = async (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    //const correctpass = await bcrypt.compare(password, user.password);
    //console.log(password);
    //console.log(user.password);
    if (user) {
      if (user.emailVerified) {
        console.log("Email Verified");
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) {
            throw error;
          } else if (!isMatch) {
            console.log("ye" + password + user.password);
            console.log("Password doesn't match!");
            res.status(401).send({ message: "*Password is Incorrect*" });
          } else {
            console.log("Password matches!");
            //local storeage send json
            //return res.json(user);
            res.status(202).send({ user: user });
          }
        });
      } else {
        console.log("Email not Verified");
        res.status(403).send({ message: "*Email is not Verified*" });
      }
    } else {
      res.status(405).send({ message: "*User is not registered*" });
    }
  });
};

//create userGoogle that checks if database has email
//if not then use the creatUser funct and utilize jti token
//if so then use get user funct and utilize jti token

// This function verifies that the user has inputted
// the correct token and CAN send a confirmation email
// FIXME:
// Implement button instead of token for verify email
*/
export const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!userId || !OTP.trim())
    return sendError(res, 'Invalid request, missing parameters!');

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid user id! ');

  const user = await Users.findById(userId);
  if (!user) return sendError(res, 'User not found!');

  if (user.verified) return sendError(res, 'This account is already verified!');

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token) return sendError(res, 'User not found!');

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, 'Please provide a valid token!');

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  // If everything is successful
  res.json({
    success: true,
    message: 'Email verified!',
    user: { name: user.name, email: user.email, id: user._id },
  });
};

// Function to add memory to a user's state's array of object
export const addMemory = async (req, res) => {
  // recieve stateAbbreviation, city, date, description, image
  const { userId, stateAbbreviation, city, date, description, image } =
    req.body;

  const user = await Users.findById(userId);

  // initialize a non-existing state
  let stateIndex = -1;

  // Look for state in states array
  for (let i = 0; i < user.states.length; i++) {
    if (user.states[i].stateAbbreviation == stateAbbreviation) {
      stateIndex = i;
      break;
    }
  }

  // State was not found, create a new state object
  if (stateIndex == -1) {
    // Declare and initialize a new state object
    const newState = {
      stateAbbreviation: String,
      cities: [],
    };

    // Assign state abbreviation
    newState.stateAbbreviation = stateAbbreviation;

    // Declare and initialize a new city object
    const newCity = {
      city: String,
      memories: [],
    };

    // Assign city name
    newCity.city = city;

    // Declare and initialize a new memory for the city
    const newMemory = { date: String, description: String, img: String };
    newMemory.date = date;
    newMemory.description = description;
    newMemory.img = image;

    // Add memory to the states array
    newCity.memories.push(newMemory);
    newState.cities.push(newCity);
    user.states.push(newState);
  }

  // If state already exists
  // Add new city or add to pre-existing city
  else {
    let cityIndex = -1;
    // Look for city in city array
    for (let i = 0; i < user.states[stateIndex].cities.length; i++) {
      if (user.states[stateIndex].cities[i].city == city) {
        cityIndex = i;
        break;
      }
    }

    // City was not found, create new city object
    if (cityIndex == -1) {
      const newCity = {
        city: String,
        memories: [],
      };

      // Assign city name
      newCity.city = city;

      const newMemory = { date: String, description: String, img: String };
      newMemory.date = date;
      newMemory.description = description;
      newMemory.img = image;

      // Add memory to the states array
      newCity.memories.push(newMemory);
      user.states[stateIndex].cities.push(newCity);
    }

    // City exists, add memory to the existing city
    else {
      const newMemory = { date: String, description: String, img: String };
      newMemory.date = date;
      newMemory.description = description;
      newMemory.img = image;
      user.states[stateIndex].cities[cityIndex].memories.push(newMemory);
    }
  }

  // Save user info to MongoDB
  user.save((err) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(user);
    }
  });
};
