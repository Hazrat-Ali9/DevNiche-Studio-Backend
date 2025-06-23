const Contact = require("../models/contact-model");

const contactForm = async (req, res)=>{
    
    try {
        const response = req.body;
        await Contact.create(response);  
        
        res.status(200).json({msg: "message submitted!"})
    } catch (error) {
        //return res.status(500).json({msg: "message not delivered"});

        console.log("Contact not delivered: ",error)
        next(error);
    }
}


module.exports = {contactForm};