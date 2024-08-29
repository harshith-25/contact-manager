const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

const getContacts = asyncHandler(async(res, req) => {
	res.status(200).json({message: "Get all contacts"});
});

const createContact = asyncHandler(async (res, req) => {
	console.log("The request body is ", req.body);
	const {name, email, phone} = req.body;

	if(!name || !phone || !email) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}
	const contact = await Contact.create({
		name, email, phone
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
	await Contact.remove();
	res.status(200).json(contact);
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};