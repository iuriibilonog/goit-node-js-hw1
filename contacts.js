const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getContactsList = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const result = JSON.parse(data);
  return result;
};

async function listContacts() {
  try {
    const list = await getContactsList();
    console.table(list);
  } catch (error) {
    console.error("error", error);
  }
}

async function getContactById(contactId) {
  try {
    const list = await getContactsList();
    const contact = list.filter((item) => item.id === contactId);
    console.table(contact);
  } catch (error) {
    console.error("error", error);
  }
}

async function removeContact(contactId) {
  try {
    const list = await getContactsList();
    const contacts = list.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`Contact with id=${contactId} has been removed`);
    console.table(await getContactsList());
  } catch (error) {
    console.error("error", error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  try {
    const list = await getContactsList();
    list.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(list));
    console.log(`Contact ${name} has been added!`);
    console.table(list);
  } catch (error) {
    console.error("error", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
