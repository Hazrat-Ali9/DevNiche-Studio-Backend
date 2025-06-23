const {z} = require('zod')
// auth login validator
const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 chars." })
        .max(255, { message: "Name must not be more than 255 characters" }),
    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least of 6 characters" })
        .max(1024, { message: "Password can't be more than 1024 characters" }),
});

module.exports = loginSchema;