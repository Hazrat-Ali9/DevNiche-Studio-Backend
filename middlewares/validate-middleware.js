const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const status = 422;
        const message = 'Fill the input properly';
        const extraDetails = err.errors ? err.errors.map(e => e.message).join(', ') : err.message;

        const error = {
            status,
            message,
            extraDetails
        };

        console.log(error);
        res.status(status).json({ message, extraDetails });
        next(error);
    }
}
// Validate Middleware
module.exports = validate;
