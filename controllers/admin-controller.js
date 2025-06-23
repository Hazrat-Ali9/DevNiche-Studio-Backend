const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const Service = require('../models/service-model');
const getAllUsers = async(req, res, next)=>{
    try {
        const users = await User.find({},{password: 0});
        if(!users || users.length === 0){
            res.status(404).json("No Users Found");
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async(req, res, next)=>{
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            res.status(404).json("No Message Found");
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

const getAllServices = async (req, res, next)=>{
    try {
        const services = await Service.find();
        if(!services || services.length === 0){
            res.status(404).json("No service found");
        }
        else{
            res.status(200).json(services);
        }
        
    } catch (error) {
        next(error)
    }
}


// *---------------------------
// Delete User Logic
// *---------------------------
const deleteUserById = async (req, res, next)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json("User Deleted Successfully");
    } catch (error) {
        next(error);
    }
}


// *---------------------------
// Get Single User Logic
// *---------------------------
const getUserById = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

// *---------------------------
// Update Single User Logic
// *---------------------------
const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        
        const updatedData = await User.updateOne({_id: id}, {
            $set: updateUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

// *---------------------------
// Delete Contact Logic
// *---------------------------
const deleteContactById = async (req, res, next)=>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json("Contact Deleted Successfully");
    } catch (error) {
        next(error);
    }
}


module.exports = {getAllUsers, getAllContacts, getAllServices, deleteUserById,getUserById, updateUserById,deleteContactById};