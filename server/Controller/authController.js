const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// user/trainer register
const register = expressAsyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;
     if(!name ||!password||!email ||! role){
        res.status(400)
        throw new Error("please pass all the required field")
     }
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    //  hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
      if(!user){
    res.status(400)
    throw new Error("user not created !")
    }
    

    res.status(201).json({name :user.name,
         email : user.email,
          role: user.role,
          id: user._id,
           token: generateToken(user._id) });
 
});

// user/trainer register
const login = expressAsyncHandler( async (req, res) => {
 
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    

    res.json({name :user.name,
        email : user.email,
        id: user._id,
        token: generateToken(user._id),
         role: user.role });
  } );

const generateToken = (id) => {
    return jwt.sign({id : id } , process.env.JWT_secret , { expiresIn: "30d" });
}
module.exports = {register,login}