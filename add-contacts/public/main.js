document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactInput = document.getElementById('contact-input');
    const contact = { id: Date.now().toString(), text: contactInput.value };
    await fetch('/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    contactInput.value = '';
    loadContacts();
});

async function loadContacts() {
    const res = await fetch('/contacts');
    const contacts = await res.json();
    const contactsList = document.getElementById('contact-list'); // Corrected ID
    contactsList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = contact.text;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteContact(contact.id);
        li.appendChild(deleteButton);
        contactsList.appendChild(li);
    });
}

async function deleteContact(id) {
    await fetch(`/contacts/${id}`, {
        method: 'DELETE'
    });
    loadContacts();
}

loadContacts();
