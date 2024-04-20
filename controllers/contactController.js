
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")


//@desc Get All Contacts
//@route GET /api/contacts
//@access public


const getContacts = asyncHandler(async (req,res) => {
    const Contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(Contacts);
});


//@desc create Contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req,res) => {


    console.log("the body is",req.body);

    const { name , email , phone } = req.body ;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are Mandatory !");
    }
    const contact = await Contact.create({
        name ,
        email,
        phone
    });

    
    res.status(201).json(contact);
});


//@desc update contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req,res) => {
    
    const contact = await Contact.findById(req.params.id);
    if(!contact){

        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(404);
        throw new Error("Wrong user trying to update");
    }


    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new : true });

    res.status(200).json(updatedContact);
});


//@desc get contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});


//@desc update contact
//@route PUT /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("contact Not Found");
    }

    await Contact.remove();

    res.status(201).json(contact);
});


module.exports = {getContacts , createContact , getContact , updateContact , deleteContact}