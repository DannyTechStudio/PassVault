/*---------------------------------------------------------------

                Menu toggle for mobile

---------------------------------------------------------------*/
const toggle = document.getElementById('menu-toggle');
const navlinks = document.getElementById('nav-links');

let menuOpen = false;

toggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    toggle.innerHTML = menuOpen ? '<i class="bi bi-x-lg"></i>' : '&#9776;';
    navlinks.classList.toggle('active');
});

/*---------------------------------------------------------------

                Passwoword Generator Page Interactivities 

---------------------------------------------------------------*/
const numberOfPasswords = document.getElementById("number-of-passwords");
const passwordLen = document.getElementById("password-length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const passwordList = document.querySelector(".passwords-list");
const preContent = document.getElementById("pre-content");
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.getElementById("close-btn");
const tagInput = document.getElementById("tag-input");
const tagSubmitBtn = document.getElementById("tag-submit-btn");

/*--------------------- Click event for generate button ---------------------*/
generateBtn.addEventListener('click', () => {

    //----------------- Validate empty inputs
    if (passwordLen.value === '' || numberOfPasswords.value === '') {
        alert("All fields are required!");
    } else{
        const count = parseInt(numberOfPasswords.value);
        const generatedPasswords = generateMultiplePasswords(count);
    
        preContent.style.display = 'none';
    
        passwordList.innerHTML = ''; //---------- Clear previous passwords

        const fragment = document.createDocumentFragment();
        
        generatedPasswords.forEach(pw => {
    
            //---------- Output Container 
            const outputContainer = document.createElement('div');
            outputContainer.className = 'output-container';
            
            //---------- Output buttons Container 
            const outputBtnsWrapper = document.createElement('div');
            outputBtnsWrapper.className = 'output-buttons-wrapper';

            //---------- Password itself
            const passwordOutput = document.createElement('p');
            passwordOutput.id = 'password-output';
            passwordOutput.textContent = pw;
            outputContainer.appendChild(passwordOutput);
            
            //------------ Copy button creation & it's functionality
            const copyBtn = document.createElement('button');
            copyBtn.title = 'Copy password';
            copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
            copyBtn.addEventListener('click', () => {
                copyToClipboard(passwordOutput.textContent);
               copyBtn.innerHTML = '<i class="bi bi-check2"></i>';
               
               setTimeout(() => {
                   copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 3000);
            });
            outputBtnsWrapper.appendChild(copyBtn);
            
            //------------- Click event listener to close the modal
            closeBtn.addEventListener('click', () => {
                modalOverlay.style.display = 'none';
            });
            
            
            //------------ Save button creation & it's functionality
            const saveBtn = document.createElement('button');
            saveBtn.title = 'Save password';
            saveBtn.innerHTML = '<i class="bi bi-save"></i>';
            saveBtn.addEventListener('click', () => {
                
                modalOverlay.style.display = 'flex';
                
                tagSubmitBtn.addEventListener('click', () => {
                    let tag  = tagInput.value.trim();

                    //---------------- validate tag input
                    if(tagInput.value.trim() === '' || tagInput.value.trim() === null){
                        alert('Please enter your password tag');
                    } else{

                        //----------------- Getting time for which the password a saved
                        const saveDate = new Date();
                        const day = String(saveDate.getDate()).padStart(2, '0');
                        const month = String(saveDate.getMonth() + 1).padStart(2, '0');
                        const year = saveDate.getFullYear();
                        const fullDate = `${day}/${month}/${year}`;
                        
                        //------------------ Storing Password and date to the local storage
                        savePassword(tag, passwordOutput.textContent, fullDate);

                        //---------------- Clear tag input
                        tagInput.value = '';
                        
                        //---------------- Close modal
                        modalOverlay.style.display = 'none';
                        
                        saveBtn.innerHTML = '<i class="bi bi-check2"></i>'
                        
                        setTimeout(() => {
                            saveBtn.innerHTML = '<i class="bi bi-save"></i>';
                        }, 3000);
                    }
                });
            });
            outputBtnsWrapper.appendChild(saveBtn);
            
            //------------ Delete button creation & it's functionality
            const delBtn = document.createElement('button');
            delBtn.title = 'Delete password';
            delBtn.innerHTML =  '<i class="bi bi-trash3"></i>';
            delBtn.addEventListener('click', () => {
                outputContainer.remove();
                if (passwordList.children.length === 0) {
                    preContent.style.display = 'block';
                }
            });
            outputBtnsWrapper.appendChild(delBtn);
    
            outputContainer.appendChild(outputBtnsWrapper);
            fragment.appendChild(outputContainer)
        });
        passwordList.appendChild(fragment);
    }
});

/*--------------------- Click event for reset button ---------------------*/
resetBtn.addEventListener('click', () => {
    passwordList.innerHTML = 'No content yet!'; 
    preContent.style.display = 'block';
    passwordLen.value = 12; 
    numberOfPasswords.value = 1; 
    uppercase.checked = true;
    lowercase.checked = true;
    numbers.checked = true;
    symbols.checked = true;
});

/*-------------------- Password generation function ---------------------*/
function generatePassword() {
    let chars = '';
    let count = 0;

    if(uppercase.checked){
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        count++;
    }

    if (lowercase.checked) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
        count++;
    }

    if (numbers.checked) {
        chars += '0123456789';
        count++;
    }

    if (symbols.checked) {
        chars += '!@#$%^&*()_+[]{}|<>?';
        count++;
    }

    /*----------- Checking how many types are seleted -----------*/
    if(count === 0){
        console.log('Count = 0');
    }
    if(count === 1){
        console.log('Count = 1');
    }
    if(count === 2){
        console.log('Count = 2');
    }
    if(count === 3){
        console.log('Count = 3');
    }
    if(count === 4){
        console.log('Count = 4');
    }

    const passwordLength = parseInt(passwordLen.value);
    let password = '';
    for (let i = 0; i < passwordLength; i++){
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

/*---------------------- Function to handle multiple passwords generation -----------------*/
function generateMultiplePasswords(count){
    const passwords = [];
    for (let i = 0; i < count; i++){
        passwords.push(generatePassword());
    }
    return passwords;
}

/*------------------ Function to copy password to clipboard ----------------------*/
function copyToClipboard (text){
    navigator.clipboard.writeText(text).then(() => {
    }), function (err){
        console.error('Failed to copy: ', err);
    };
}

/*------------------ Function to Save password to the Local Storage ----------------------*/
let saveTimeout;
function savePassword(passTag, pw, date){
    let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
    savedPasswords.push({Tag: passTag, Password: pw, Date: date});

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    }, 300);
}








