const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.createUser = async (req, res) => {
  try {
    // take the data from req.body
    const { email, name, password, confirmPassword } = req.body;

    // password and confirmpassword are same or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "password and confirm password does not match",
        status: "failure",
      });
    }

    // check whether the user is present by the email
    // findOne
    const user = await User.findOne({ email: email });

    //user exist in database
    if (user) {
      return res.status(400).json({
        message: "User already exists!",
        status: "failure",
      });
    }

    // hashing the plaintext password and then storing it in db
    const hashedPassword =await  bcrypt.hashSync(password, saltRounds);

    // create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User created successfully!",
      status: "success",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Opps something went wrong!",
      status: "failure",
      error: error,
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    // fetch data from req.body
    const { email, password } = req.body;

    // fetch user data from the db based on email
    const user = await User.findOne({ email: email });
    console.log('user', user)
    // if user does not exist in db
    if (!user) {
      return res.status(400).json({
        message: "You need to created an acount",
        status: "failure",
      });
    }

    // check password and user.password are same or not
    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Email/password does not match",
        status: "failure",
      });
    }

    return res.status(200).json({
      message: "SignedIn successfully!",
      status: "success",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Opps something went wrong!",
      status: "failure",
      error: error,
    });
  }
};

module.exports.userDetails = async (req, res) => {
  try{
    // fetching userId from the params
    const { userId } = req.params;

    // fetch the user data from db based on userId
    // we will fetch selective fields of user from db
    // we will populate the quotation array
    const user = await User.findById(userId, 'name email quotaions').populate({
      path: 'quotaions',
    })

    return res.status(200).json({
      message: 'User data fetched syccessfully from DB!',
      data: {
        user: user
      }
    })
  }catch(error){
    return res.status(500).json({
      message: 'Error while fetching user details from db!',
      data: {
        error: error
      },
    })
  }
}
