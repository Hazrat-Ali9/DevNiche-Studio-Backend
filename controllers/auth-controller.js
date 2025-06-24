// auth controller
const User = require('../models/user-model');
const bcrypt = require("bcryptjs");

// *---------------------
// Home Logic
// *---------------------

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome using controllers");
    } catch (error) {
        console.log(error)
    }
};

// *---------------------
// Registration Logic
// *---------------------
// 1. Get Registration Data: Retrieve user data (username, email, password).
// 2. Check Email Existence:  Check if the email is already registered
// 3. Hash Password: Security hash the password
// 4. Create User: Create a new user with hashed password.
// 5. Save to DB: Save user data to the database
// 6. Respond: Respond with "Registration Successful" or handle errors.

const register = async (req, res) => {
    try {
            console.log(req.body);
            const {username, email, phone, password} = req.body;

            const userExist = await User.findOne({email});

            if(userExist){
                return res.status(400).json("email already exists");
            }

            // hash the password
            // const saltRound = 10;
            // const hash_password = await bcrypt.hash(password, saltRound);

            const userCreated = await User.create({username, email, phone, password});

            res.status(201).json({msg: "Registration successful", token: await userCreated.generateToken(), userId: userCreated._id.toString()});
    } catch (error) {
        res.status(500).json("internal server error");
    }
}


// *---------------------
// User Login Logic
// *---------------------

const login = async(req, res)=> {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        //first method
        //const user = await bcrypt.compare(password, userExist.password);

        //second method
        const user = await userExist.comparePassword(password);

        if(user){
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else{
            res.status(401).json({message: "Invalid email or password"});
        }

    } catch (error) {
        // res.status(500).json("internal server error");
        next(error);
    }
}


// *---------------------
// to send user data - User Logic
// *---------------------
const user = async(req, res)=>{
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from the user route ${error}`);
    }
}
module.exports = {home, register, login, user};