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

                History Page

---------------------------------------------------------------*/
const passwordContainer = document.querySelector('.saved-passwords-container');

function renderPasswords(){
    const storedData = localStorage.getItem('savedPasswords');
    const isEncrypted = localStorage.getItem('isEncrypted') === 'true';

     // Case 1: No saved passwords
    if (!storedData) {
        passwordContainer.textContent = 'No history yet!';
        return;
    }

    // Case 2: Encrypted
    if (isEncrypted) {
        passwordContainer.textContent = 'Data is encrypted. Go to the Settings page and decrypt data to view';
        return;
    }

    // Case 3: Decrypted and has data
    try {
        const passwords = JSON.parse(storedData);

        if (!Array.isArray(passwords) || passwords.length === 0) {
            passwordContainer.textContent = 'No history yet!';
            return;
        }
    
        passwords.forEach(item => {
            const savedPwContainer = document.createElement('div');
            savedPwContainer.className = 'saved-pw-container';
            
            //-------------------- Password Tag element
            const passwordTag = document.createElement('p');
            passwordTag.className = 'password-tag';
            passwordTag.textContent = item.Tag;
            savedPwContainer.appendChild(passwordTag);
            
            //-------------------- Password itself
            const savedPwHolder = document.createElement('input');
            savedPwHolder.className = 'saved-pw-holder';
            savedPwHolder.type = 'password';
            savedPwHolder.setAttribute('readonly', true);
            savedPwHolder.value = item.Password;
            savedPwContainer.appendChild(savedPwHolder);
            
            //-------------------- Password Date
            const dateSavedholder = document.createElement('p');
            dateSavedholder.className = 'date-saved';
            dateSavedholder.textContent = item.Date;
            savedPwContainer.appendChild(dateSavedholder);
            
            //-------------------- Appending Saved Password Container to its parent
            passwordContainer.appendChild(savedPwContainer);
            
            const actionBtnsContainer = document.createElement('div');
            actionBtnsContainer.className = 'action-btn-container';
            savedPwContainer.appendChild(actionBtnsContainer);
            
            //-------------------- Appending Saved Password Container to its parent
            const hiddenBtnContainer = document.createElement('div');
            hiddenBtnContainer.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
            hiddenBtnContainer.className = 'hidden-btn-container';
            hiddenBtnContainer.title = 'Actions';
            hiddenBtnContainer.addEventListener('click', () => {
                if(actionBtnsContainer.style.display === 'none'){
                    actionBtnsContainer.style.display = 'flex';
                    console.log(savedPwContainer.lastChild);
                } else{
                    actionBtnsContainer.style.display = 'none';
                }
            });
            savedPwContainer.appendChild(hiddenBtnContainer);
        
            //-------------------- View button functionality
            const viewBtn = document.createElement('button');
            viewBtn.id = 'view-btn';
            viewBtn.title = 'view password';
            viewBtn.innerHTML = '<i class="bi bi-eye"></i>';
            viewBtn.addEventListener('click', () => {
                if(savedPwHolder.type === 'password'){
                    savedPwHolder.type = 'text';
                    savedPwHolder.value = item.Password;
                    viewBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
                } else {
                    savedPwHolder.type = 'password';
                    viewBtn.innerHTML = '<i class="bi bi-eye"></i>';
                }
            });
            actionBtnsContainer.appendChild(viewBtn);
        
            //-------------------- Copy button functionality 
            const copySavedPwBtn = document.createElement('button');
            copySavedPwBtn.id = 'copy-saved-pw-btn';
            copySavedPwBtn.title = 'Copy password';
            copySavedPwBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
            copySavedPwBtn.addEventListener('click', () => {
               navigator.clipboard.writeText(savedPwHolder.value);
               copySavedPwBtn.innerHTML = '<i class="bi bi-check2"></i>';
               
                setTimeout(() => {
                    copySavedPwBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 3000);
            });
            actionBtnsContainer.appendChild(copySavedPwBtn);
        
            //-------------------- Delete button functionality 
            const deleteSavedPwBtn = document.createElement('button');
            deleteSavedPwBtn.id = 'delete-saved-pw-btn';
            deleteSavedPwBtn.title = 'Delete password';
            deleteSavedPwBtn.innerHTML = '<i class="bi bi-trash3"></i>';
            deleteSavedPwBtn.addEventListener('click', () => {
                passwordContainer.removeChild(savedPwContainer);
        
                let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
                savedPasswords = savedPasswords.filter(pw => pw.Password !== item.Password || pw.Date !== item.Date);
                localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
            });
            actionBtnsContainer.appendChild(deleteSavedPwBtn);
        });
    } catch (e) {
        passwordContainer.textContent = 'Go to settings and decrypt data to view';
    }
}

document.addEventListener('DOMContentLoaded', renderPasswords());

