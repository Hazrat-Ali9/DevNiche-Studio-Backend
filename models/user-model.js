const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

//? secure the password with bcrypt
userSchema.pre('save', async function(next){
    //console.log("pre method: ",this);
    const user = this;
    if(!user.isModified('password')){
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

// compare the password for login
userSchema.methods.comparePassword = async function(password){
    return  bcrypt.compare(password, this.password);
}


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRECT_KEY,
        {
            expiresIn: '30d',
        }
    )
    } catch (error) {
        console.error(error);
    }
};





// define the model or the collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;






// **What is JWT?**
/**
 * JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for security transmitting information between parties as a JSON object.
 *? JWT are often used for authentication and authorization in  web applications.
 *? 1. **Authentication:** Verifying the identity of a user or client
 *? 2. **Authorization:** Determining what actions a user or client is allowed to perform
 */

// **Components of a JWT:**
/**
 * Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
 * Payload: Contain claims or statement about an entity (typically, the user) and additional data . Common claims include user ID, username, and expiration time.
 * Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.
 */


// **JSON webtoken**
/**
 * Tokens, such as JWTs (JSON Web Token) are typically not stored in the database along with other user details. Instead, they are issued during authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use.
 */