const express = require('express');
const router = express.Router();
const contactController = require("../controllers/contact-controller");
const validate = require('../middlewares/validate-middleware');
const contactSchema = require('../validators/contact-validator');

router.route("/contact").post(validate(contactSchema), contactController.contactForm);

module.exports = router;