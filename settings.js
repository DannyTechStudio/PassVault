document.addEventListener('DOMContentLoaded', () => {
    /*---------------------------------------------------------------
    
                    Settings Page Interactivities 
    
    ---------------------------------------------------------------*/
    const themeToggleWrapper = document.getElementById('theme-toggle-wrapper');
    const encryptToggleWrapper = document.getElementById("encrypt-toggle-wrapper");
    const clearStoreBtn = document.getElementById("clear-storage-btn");
    const masterPassModalOverlay = document.querySelector('.pass-modal-overlay');
    const closeIcon = document.getElementById('close-icon');
    const masterPassInput = document.getElementById('master-password-input');
    const masterPassSubmitBtn = document.getElementById('submit-pass');
    
    
    //---------------------------- Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        themeToggleWrapper.classList.add('active');
    }

    themeToggleWrapper.addEventListener('click', () => {
        //------------------------- Toggle visual button state
        themeToggleWrapper.classList.toggle('active');
    
        //------------------------- Get current theme
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
        //------------------------- Apply and store new theme
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

        //---------------------- Set default encryption state on page load
    function updateToggleFromStorage() {
        const savedPasswordsRaw = localStorage.getItem('savedPasswords');
    
        if (!savedPasswordsRaw || savedPasswordsRaw === '[]') {
            //------------------- No saved data
            localStorage.setItem('isEncrypted', 'false');
            encryptToggleWrapper.classList.remove('active');
        } else {
            if (localStorage.getItem('isEncrypted') === 'true') {
                encryptToggleWrapper.classList.add('active');
            } else {
                encryptToggleWrapper.classList.remove('active');
            }
        }
    }
    
    //-------------------------- Initial check on page load
    updateToggleFromStorage();

    //----------------- Click event for the encrypt toggle
    encryptToggleWrapper.addEventListener('click', () => {
        const isEncrypted = localStorage.getItem('isEncrypted') === 'true';
        const rawData = localStorage.getItem('savedPasswords');
    
        if (!rawData) {
            alert('No saved data!');
            return;
        }
    
        // Only parse JSON if not encrypted
        if (!isEncrypted) {
            const savedData = JSON.parse(rawData || '[]');
            if (savedData.length === 0) {
                alert('No saved data!');
                return;
            }
        }
    
        //---------------- Show modal
        masterPassModalOverlay.style.display = 'flex';
    });
    
    
    //----------------- Click event for the master password submit button
    masterPassSubmitBtn.addEventListener('click', () => {
        const masterPassword = masterPassInput.value.trim();
        if (masterPassword === '') {
            alert('Please enter your master password.');
            return;
        }
    
        const storedData = localStorage.getItem('savedPasswords');
        const isEncrypted = localStorage.getItem('isEncrypted') === 'true';
    
        if (!storedData || storedData === '[]') {
            alert('No saved data to process.');
            localStorage.setItem('isEncrypted', 'false');
            encryptToggleWrapper.classList.remove('active');
            return;
        }
    
        if (!isEncrypted) {
            //---------------------- ENCRYPT
            try {
                const savedPasswords = JSON.parse(storedData) || [];
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(savedPasswords), masterPassword).toString();
                localStorage.setItem('savedPasswords', encryptedData);
                localStorage.setItem('isEncrypted', 'true');
                encryptToggleWrapper.classList.add('active');
            } catch (e) {
                console.error('Encryption failed:', e);
                alert('Could not encrypt data');
            }
        } else {
            //---------------------- DECRYPT
            try {
                const bytes = CryptoJS.AES.decrypt(storedData, masterPassword);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
                if (!decryptedData) throw new Error('Decryption failed');
    
                localStorage.setItem('savedPasswords', JSON.stringify(decryptedData));
                localStorage.setItem('isEncrypted', 'false');
    
                // If decrypted data is empty, reset state
                if (decryptedData.length === 0) {
                    encryptToggleWrapper.classList.remove('active');
                } else {
                    encryptToggleWrapper.classList.remove('active'); // decrypted → always inactive
                }
            } catch {
                alert('Incorrect master password. Could not decrypt.');
                return;
            }
        }
    
        //----------------- Close modal & clear input
        masterPassModalOverlay.style.display = 'none';
    
        // Always re-check state after encryption/decryption
        updateToggleFromStorage();
    });
    
    //---------------------- Whenever you delete passwords elsewhere in your app:
    // Example: call this after deletion
    function handlePasswordDeletion() {
        const savedData = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
        if (savedData.length === 0) {
            localStorage.setItem('isEncrypted', 'false');
            encryptToggleWrapper.classList.remove('active');
        }
    }
    
    //----------------- Click event for the close button
    closeIcon.addEventListener('click', () => {
        masterPassModalOverlay.style.display = 'none'
    });
    
    //----------------- Click event for the clear data icon
    clearStoreBtn.addEventListener('click', () => {
        localStorage.removeItem('savedPasswords');
        handlePasswordDeletion();
    });

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
});



