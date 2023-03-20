const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { User } = require('../../models');
const { redisClient, setBlockedToken } = require('../../utils/redis');

async function signUp(args, _context, _info) {
  try {
    const { username, password, role } = args.userInput;
    const existedUser = await User.findOne({ username }).lean();
    if (existedUser) {
      return {
        isSuccess: false,
        message: 'Username invalid or already taken',
      };
    }
    if (role === 'Admin') {
      return {
        isSuccess: false,
        message: 'Cannot create admin account',
      };
    }
    const hashedPassword = await argon2.hash(password);
    const { userInput } = args;
    userInput.password = hashedPassword;
    const user = await User.create(userInput);
    return {
      isSuccess: true,
      message: 'Sign up successfully',
      user,
    };
  } catch (err) {
    return {
      isSuccess: false,
      message: err,
    };
  }
}

async function login(args, _context, _info) {
  const { username, password } = args;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return {
        isSuccess: false,
        message: 'Invalid Credentials!',
      };
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      return {
        isSuccess: false,
        message: 'Invalid Credentials!',
      };
    }

    if (user.isActive === false) {
      return {
        isSuccess: false,
        message: 'Invalid Credentials!',
      };
    }
    const token = jwt.sign({ userId: user._id }, config.jwt.secretKey, { expiresIn: config.jwt.expireTime });

    return {
      isSuccess: true,
      message: 'Login successfully',
      token,
      user,
    };
  } catch (err) {
    return {
      isSuccess: false,
      message: err,
      token: null,
    };
  }
}

async function logout(args, _context, _info) {
  try {
    const { token } = _context;
    setBlockedToken(token, config.jwt.expireTime);
    return {
      isSuccess: true,
      message: 'logout success',
    };
  } catch (err) {
    return {
      isSuccess: false,
      message: err,
    };
  }
}



module.exports = {
  logout,
  signUp,
  login,
};
