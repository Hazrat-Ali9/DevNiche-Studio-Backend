const {z} = require("zod");

const contactSchema = z.object({
    username: z
    .string({required_error: "Username is required"})
    .trim()
    .min(3, {message: "Username must be at least 3 characters"})
    .max(255, {message: "Username must not be more than 255 characters"}),
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Email is invalid"})
    .min(3, {message: "Email must be at least 3 characters"})
    .max(255, {message: "Email must not be more than 255 characters"}),
    message: z
    .string({required_error: "Description is required"})
    .trim()
    .min (3, {message: "Minimum length of description is 3 characters"})


})

module.exports = contactSchema;