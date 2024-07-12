const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

let contacts = [];

app.get('/contacts',(req, res) => {
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const contact = req.body;
    contacts.push(contact);
    res.status(201).json(contact);
});

app.put('/contacts/:id', (req, res)=> {
    const id = req.params.id;
    const updatedContact = req.body;
    contacts = contacts.map(contact => contact.id === id ? updatedContact : contact);
    res.json(updatedContact);
});

app.delete('/contacts/:id',(req, res)=>{
    const id = req.params.id;
    contacts = contacts.filter(contact=> contact.id !== id);
    res.status(204).send();
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});
