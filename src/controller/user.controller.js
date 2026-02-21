const bcrypt = require("bcryptjs");
const User = require("../model/users");
const jwt = require("jsonwebtoken");



async function createToken(user){
      const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        ) 
        return token
}

const registerUser = async (req, res) => {
   try{
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) { return res.status(400).json({ message: "All fields are required" }); }
    
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

   const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
   });

    // generate a token for them to log them in   
        const token = await createToken(newUser)

    res.status(201).json({ message: "User registered successfully", user: newUser, token });

   }catch(error){
    console.log(error.message)
    res.status(500).json({ message: "Internal server error", error });
   }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        // find if the user is in out daatabase
        const user = await User.findOne({ email });    
        
        // if there is no user with the email provided, return an error
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        // if there 
        // is a user, we will compare the password provided with the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // if the password is not valid, return an error
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password" });
        }

        // if the password is valid then we login then in and generate a token for them 
        const token = await createToken(user)

        res.status(200).json({ message: "Login successful", token });
      
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        
    }
}



async function getUser(req, res){
    const decodedId = req.user.userId

    try{
        const user = await User.findById(decodedId)
        console.log(user)
        res.status(200).json(user)
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}