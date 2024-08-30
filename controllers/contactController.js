const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

const getContacts = asyncHandler(async(res, req) => {
	const contacts = await Contact.find({ user_id: req.user.id });
	res.status(200).json(contacts);
});

const createContact = asyncHandler(async (res, req) => {
	console.log("The request body is ", req.body);
	const {name, email, phone} = req.body;

	if(!name || !phone || !email) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}
	const contact = await Contact.create({
		name, email, phone, user_id: req.user.id
	});

	res.status(200).json(contact);
});

const getContact = asyncHandler(async (res, req) => {
	const contact = await Contact.findById(req.params.id);
	if(!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	res.status(201).json(contact);
});

const updateContact = asyncHandler(async (res, req) => {
	const contact = await Contact.findById(req.params.id);
	if(!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}

	if (contact.user_id.toString() !== req.user.id) {
		res.status(403)
		throw new Error("User dont have permission to update other user contact");
	}
	const updatedContact = await Contact.findByIdAndUpdate(
		req.params.id,
		req.body,
		{new: true}
	);
	res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (res, req) => {
	const contact = await Contact.findById(req.params.id);
	if(!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	if (contact.user_id.toString() !== req.user.id) {
		res.status(403)
		throw new Error("User dont have permission to update other user contact");
	}
	await Contact.deleteOne({_id: req.params.id});
	res.status(200).json(contact);
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};