import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

//for login
export const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId, password });
    if (user) {
      res.status(200).send(user);
    } else {
      res.json({
        message: 'Login Fail',
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//for register
export const registerController = async (req, res) => {
  const { name, password, userId } = req.body;

  User.findOne({ userId: userId })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            password: hashedPassword,
            userId: userId,
          });
          return user.save();
        })
        .then((result) => {
          console.log(result);
          res.redirect('/');
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
