interface Contact {
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;
}

const contacts: Contact[] = [
    {
        name: 'Chandermani Arora',
        email: 'chandermani@technovert.com',
        mobile: '+91 9292929292',
        landline: '040 1231211',
        website: 'http://www.technovert.com',
        address: '123 some street,<br> Madhapur, Hyderabad 500033',
    },
    {
        name: 'Sashi Pagadala',
        email: 'sashi@technologyt.com',
        mobile: '+91 9292929292',
        landline: '040 1231211',
        website: 'http://www.technovert.com',
        address: '123 some street,<br>Madhapur, Hyderabad 500033',
    },
    {
        name: 'Praveen Battula',
        email: 'praveen@technovert.com',
        mobile: '+91 123 345 2342',
        landline: '040 1231211',
        website: 'http://www.technovert.com',
        address: '123 some street,<br>Madhapur, Hyderabad 500033',
    },
    {
        name: 'Vijay Yalamanchili',
        email: 'vijay@technovert.com',
        mobile: '+91 9292929292',
        landline: '040 1231211',
        website: 'http://www.technovert.com',
        address: '123 some street,<br>Madhapur, Hyderabad 500033',
    }
];

const contactsDiv = document.getElementById('contacts') as HTMLUListElement;
const contactDetailsSection = document.getElementById('contactDetails') as HTMLElement;
const editSection = document.createElement('div');
editSection.id = 'editSection';
editSection.style.display = 'none';
document.body.appendChild(editSection);

const addSection = document.createElement('div');
addSection.classList.add('form-section');
document.body.appendChild(addSection);

let currentContactIndex: number | null = null;

function displayContactDetails(index: number) {
    const contact = contacts[index];
    currentContactIndex = index;

    contactDetailsSection.innerHTML = `
    <div class="contact-header">
        <h2 class="contact-name">${contact.name}</h2>
        <div class="action-container">
            <img src="/Photos/edit1.jpg" alt="Edit" class="edit-icon" />
            <button class="edit-button">Edit</button>
            <img src="/Photos/delete1.png" alt="Delete" class="delete-icon" />
            <button class="delete-button">Delete</button>
        </div>
    </div>
    <div class="disp">
        <p>Email: ${contact.email}</p>
        <p class="moblanddis">Mobile: ${contact.mobile}<br>
        ${contact.landline ? `Landline: ${contact.landline}<br></p>` : ''}
        ${contact.website ? `<p>Website: <a href="${contact.website}" target="_blank">${contact.website}</a></p>` : ''}
        <p class="address">Address: ${contact.address.replace(/<br>/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;')}</p>
    </div>
    `;

    contactDetailsSection.style.display = 'block';

    const editButton = document.querySelector('.edit-button') as HTMLButtonElement;
    const deleteButton = document.querySelector('.delete-button') as HTMLButtonElement;
    const deleteIconImg = document.querySelector('.delete-icon') as HTMLImageElement;

    if (editButton) {
        editButton.addEventListener('click', () => {
            showEditForm(index);
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            deleteContact(index);
        });
    }

    if (deleteIconImg) {
        deleteIconImg.addEventListener('click', () => {
            deleteContact(index);
        });
    }
}

function showEditForm(index: number) {
    const contact = contacts[index];
    editSection.innerHTML = `
        <h2>Edit Contact</h2>
        <form id="editForm">
            <label id="editLabel">Name: <br>
            <input type="text" id="editName" id="editInput" value="${contact.name}" required /></label><br>
            <label id="editLabel">Email: <br> <input type="email" id="editEmail" id="editInput" value="${contact.email}" required /></label><br>
            <div class="moblanddis">
                <label id="editLabel"><span>Mobile: <br><input type="text" id="editMobile" value="${contact.mobile}" required /></label></span>
                ${contact.landline ? `<label id="editLabel"><span>Landline:<br><input type="text" id="editLandline" value=" ${contact.landline}" required /></label></span>` : ''}
            </div>
            <label id="editLabel">Website: <br><input type="text" id="editWebsite" id="editInput" value="${contact.website}" /></label><br>
            <label id="editLabel">Address: <br><textarea id="editAddress" id="editInput" required>${contact.address.replace(/<br>/g, '\n')}</textarea></label><br>
            <button type="button" id="saveButton">Save</button>
            <button type="button" id="cancelButton">Cancel</button>
        </form>
    `;
    
    const contactItems = document.querySelectorAll('#contacts li');
    contactItems.forEach(item => {
        const htmlItem = item as HTMLElement;
        htmlItem.classList.add('disabled');
        htmlItem.style.pointerEvents = 'none';
    });

    // Styling for editSection
    editSection.style.display = 'block';
    editSection.style.position = 'absolute';
    editSection.style.left = '50%';
    editSection.style.top = '50%';
    editSection.style.transform = 'translate(-50%, -50%)';
    editSection.style.zIndex = '1000';
    editSection.style.backgroundColor = 'white';
    editSection.style.padding = '10px';
    editSection.style.width = '50%';
    editSection.style.height = '80%';
    editSection.style.marginTop = "150px";
    editSection.style.marginLeft = "90px";
    editSection.style.boxShadow = '0px 0px 10px rgba(0.1, 0.1, 0.1, 0.1)';
    
    const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
    const cancelButton = document.getElementById('cancelButton') as HTMLButtonElement;

    saveButton.addEventListener('click', () => {
        saveContact(index);
        enableContactSelection();
    });

    cancelButton.addEventListener('click', () => {
        cancelEdit();
        enableContactSelection();
    });
}

function enableContactSelection() {
    // Re-enable all contact list items
    const contactItems = document.querySelectorAll('#contacts li');
    contactItems.forEach(item => {
        const htmlItem = item as HTMLElement;
        htmlItem.classList.remove('disabled');
        htmlItem.style.pointerEvents = 'auto';
    });
}

function saveContact(index: number) {
    const editName = (document.getElementById('editName') as HTMLInputElement).value.trim();
    const editEmail = (document.getElementById('editEmail') as HTMLInputElement).value.trim();
    const editMobile = (document.getElementById('editMobile') as HTMLInputElement).value.trim();
    const editLandline = (document.getElementById('editLandline') as HTMLInputElement)?.value.trim();
    const editWebsite = (document.getElementById('editWebsite') as HTMLInputElement).value.trim();
    const editAddress = (document.getElementById('editAddress') as HTMLTextAreaElement).value.trim().replace(/\n/g, '<br>');

    // Validate fields
    const namePattern = /^[A-Za-z\s]+$/;  // Allows only letters and spaces
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple email regex pattern
    const phonePattern = /^[0-9]{10}$/;  // Allows exactly 10 digits for mobile/landline

    if (!editName || !editEmail || !editMobile || (editLandline && !phonePattern.test(editLandline)) || !editAddress) {
        alert('Please fill out all mandatory fields.');
        return;
    }

    if (!namePattern.test(editName)) {
        alert('Name should only contain letters and spaces, with no numbers or special characters.');
        return;
    }

    if (!emailPattern.test(editEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phonePattern.test(editMobile)) {
        alert('Mobile number should contain exactly 10 digits.');
        return;
    }

    contacts[index] = {
        name: editName,
        email: editEmail,
        mobile: editMobile,
        landline: editLandline || '',
        website: editWebsite,
        address: editAddress,
    };

    updateContactList();
    displayContactDetails(index);
    editSection.style.display = 'none';
}

function cancelEdit() {
    editSection.style.display = 'none';
}


function deleteContact(index: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
        contacts.splice(index, 1);

        updateContactList();
        contactDetailsSection.style.display = 'none';
        editSection.style.display = 'none';
    }
}

const addContactButton = document.getElementById('addContactButton') as HTMLButtonElement;

addContactButton.addEventListener('click', () => {
    showAddForm();
});

function showAddForm() {
    addSection.innerHTML = `
        <h2>Add New Contact</h2>
        <form id="addForm">
            <label id="editLabel">Name: <br>
            <input type="text" id="addName" required /></label><br>
            <label id="editLabel">Email: <br> <input type="email" id="addEmail" required /></label><br>
            <div class="moblanddis">
                <label id="editLabel"><span>Mobile: <br><input type="text" id="addMobile" required /></label></span>
                <label id="editLabel"><span>Landline: <br><input type="text" id="addLandline" /></label></span>
            </div>
            <label id="editLabel">Website: <br><input type="text" id="addWebsite" /></label><br>
            <label id="editLabel">Address: <br><textarea id="addAddress" required></textarea></label><br>
            <button type="button" id="saveAddButton">Add</button>
            <button type="button" id="cancelAddButton">Cancel</button>
        </form>
    `;

    // Styling for addSection (same as editSection)
    addSection.style.display = 'block';
    addSection.style.position = 'absolute';
    addSection.style.left = '50%';
    addSection.style.top = '50%';
    addSection.style.transform = 'translate(-50%, -50%)';
    addSection.style.zIndex = '1000';
    addSection.style.backgroundColor = 'white';
    addSection.style.padding = '10px';
    addSection.style.width = '50%';
    addSection.style.height = '80%';
    addSection.style.marginTop = "150px";
    addSection.style.marginLeft = "90px";
    addSection.style.boxShadow = '0px 0px 10px rgba(0.1, 0.1, 0.1, 0.1)';

    const saveAddButton = document.getElementById('saveAddButton') as HTMLButtonElement;
    const cancelAddButton = document.getElementById('cancelAddButton') as HTMLButtonElement;

    saveAddButton.addEventListener('click', () => {
        saveNewContact();
        enableContactSelection();
    });

    cancelAddButton.addEventListener('click', () => {
        cancelAdd();
        enableContactSelection();
    });
}

function saveNewContact() {
    const addName = (document.getElementById('addName') as HTMLInputElement).value.trim();
    const addEmail = (document.getElementById('addEmail') as HTMLInputElement).value.trim();
    const addMobile = (document.getElementById('addMobile') as HTMLInputElement).value.trim();
    const addLandline = (document.getElementById('addLandline') as HTMLInputElement)?.value.trim();
    const addWebsite = (document.getElementById('addWebsite') as HTMLInputElement).value.trim();
    const addAddress = (document.getElementById('addAddress') as HTMLTextAreaElement).value.trim().replace(/\n/g, '<br>');

    // Validate fields (same validation as the edit form)
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!addName || !addEmail || !addMobile ||  !addAddress) {
        alert('Please fill out all mandatory fields.');
        return;
    }

    if (!namePattern.test(addName)) {
        alert('Name should only contain letters and spaces, with no numbers or special characters.');
        return;
    }

    if (!emailPattern.test(addEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!phonePattern.test(addMobile)) {
        alert('Mobile number should contain exactly 10 digits.');
        return;
    }

    const newContact: Contact = {
        name: addName,
        email: addEmail,
        mobile: addMobile,
        landline: addLandline || '',
        website: addWebsite,
        address: addAddress,
    };

    contacts.push(newContact);
    updateContactList();
    addSection.style.display = 'none';
}

function cancelAdd() {
    addSection.style.display = 'none';
}


function updateContactList() {
    contactsDiv.innerHTML = '';
    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('li');
        contactItem.innerHTML = `
            <div class="contact-name">${contact.name}</div>
            <div class="contact-info">Email: ${contact.email}</div>
            <div class="contact-info">Mobile: ${contact.mobile}</div>
        `;
        
        contactItem.addEventListener('click', () => {
            displayContactDetails(index);
        });
        
        contactsDiv.appendChild(contactItem);
    });
}

// Initialize the contact list
updateContactList();

const homeButton = document.getElementById('homeBtn') as HTMLButtonElement;

homeButton.addEventListener('click', () => {
    resetToHomeView();
});

function resetToHomeView() {
    // Hide the contact details and form sections
    contactDetailsSection.style.display = 'none';
    editSection.style.display = 'none';
    addSection.style.display = 'none';

    // Show the contact list
    const contactItems = document.querySelectorAll('#contacts li');
    contactItems.forEach(item => {
        const htmlItem = item as HTMLElement;
        htmlItem.classList.remove('disabled');
        htmlItem.style.pointerEvents = 'auto';
        htmlItem.style.display = 'block';
    });
    
    
}

