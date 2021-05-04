const fs = require("fs/promises");
const path = require("path");
const { uuid } = require("uuidv4");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
    console.table(contactList);
    return contactList;
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactList = JSON.parse(data);
    const getContact = contactList.find(
      (contact) => contact.id === Number(contactId)
    );
    console.table(getContact);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    const contactDelete = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactDelete, null, 2));
    console.log(`Удалили контакт ${contactId}`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    const id = uuid();
    const contactAdd = { id, name, email, phone };
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, contactAdd], null, 2)
    );
    console.table(contactAdd);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
