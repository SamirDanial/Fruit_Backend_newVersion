const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Token_generator = require('../utility/token_generator')


module.exports = {
    loginUser: async function({ credintialInput }, req) {
        const existingUser = await User.findOne({ username: credintialInput.username }).populate('userRole');
        if (!existingUser) {
          const error = new Error('User not found');
          error.data = 'Please provide a currect Username';
          error.code = 401;
          throw error;
        }
    
        const isMatch = await bcrypt.compare(
          credintialInput.password,
          existingUser.password
        );
    
        if (!isMatch) {
          const error = new Error('Password is not correct');
          error.data = 'Please provide a currect Password';
          error.code = 401;
          throw error;
        }
    
        let authToken;
    
        await Token_generator(existingUser.id)
          .then((token) => {
            authToken = token;
          })
          .catch((err) => {
            console.log(err.message);
          });
    
        return {
          ...existingUser._doc,
          token: authToken,
          id: existingUser._id.toString(),
        };
    },
    createUser: async function ({ userInput }, req) {
      const errors = [];
      if (
        validator.isEmpty(userInput.password) ||
        !validator.isLength(userInput.password, { min: 5 })
      ) {
        errors.push({ message: "Password is too short" });
      }
  
      if (errors.length > 0) {
        const error = new Error('Invalid Input')
        error.data = errors;
        error.code = 402;
        throw error
      }
  
      const existingUser = await User.findOne({ username: userInput.username });
      if (existingUser) {
        const error = new Error("User exists already!");
        error.data = errors;
        error.code = 402;
        throw error;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPw = await bcrypt.hash(userInput.password, salt);
      const rolename = userInput.userRole;
      const role = await UserRole.findOne({name: rolename});
      const user = new User({
        username: userInput.username,
        password: hashedPw,
        userRole: role
      });
  
  
      const createdUser = await user.save();
  
      let authToken;
  
      await Token_generator(user.id)
        .then((token) => {
          authToken = token;
        })
        .catch((err) => {
          console.log(err.message);
        });
  
      return {
        ...createdUser._doc,
        token: authToken,
        id: createdUser._id.toString(),
      };
    },
}
