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

                Passwoword Strength Checker Page Interactivities 
                
---------------------------------------------------------------*/
const passwordInput = document.getElementById('password-input');
const checkBtn = document.getElementById('check-strength-btn');
const clearBtn = document.getElementById('clear-btn');
const resultPercentage = document.getElementById('result-percent');
const resultRange = document.getElementById('result-range');
const result = document.getElementById('result');
const entropyScore = document.getElementById('entropy-score');

/*--------------------- Click event for check button ---------------------*/
checkBtn.addEventListener('click', () => {

    console.log('Check button clicked')

    //----------------- Validate empty input
    const password = passwordInput.value

    if(passwordInput.value === ''){
        alert('Please enter a password!');
        showModalPopup('Please enter a password!', 'red', 'white');
    }

    let score = 0;
    if(password.length >= 8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/\d/.test(password)) score++;
    if(/[^!@#$%^&*()_+-{}[]?<>]/.test(password)) score++;

    if(score <= 2){
        resultPercentage.textContent = '25%';
        resultRange.value = 20;
        resultRange.disabled = false;
        result.style.display = 'block';
        result.textContent = 'Weak';
        result.style.color = 'red';
        calculateEntropy(password);
    } else if(score === 3){
        resultPercentage.textContent = '50%';
        resultRange.value = 50;
        resultRange.disabled = false;
        result.style.display = 'block';
        result.textContent = 'Moderate';
        result.style.color = '#ffa601ff';
        calculateEntropy(password);
    } else if(score === 4){
        resultPercentage.textContent = '75%';
        resultRange.value = 75;
        resultRange.disabled = false;
        result.style.display = 'block';
        result.textContent = 'Strong';
        result.style.color = '#12ff01ff';
        calculateEntropy(password);
    } else {
        resultPercentage.textContent = '100%';
        resultRange.value = 100;
        resultRange.disabled = false;
        result.style.display = 'block';
        result.textContent = 'Very Strong';
        result.style.color = '#0180ff';
        calculateEntropy(password);
    }
});

/*--------------------- Click event for clear button ---------------------*/
clearBtn.addEventListener('click', () => {
    passwordInput.value = '';
    resultPercentage.textContent = '0%';
    resultRange.value = 0;
    resultRange.disabled = true;
    result.style.display = 'none';
    result.textContent = '';
    entropyScore.textContent = '';
});

/*--------------------- Function for checking entropy score ---------------------*/
function calculateEntropy(password){
    const L = password.length;
    let entropy = 0;
    let R = 0;

    if(/[a-z]/.test(password)) R += 26;
    if(/[A-Z]/.test(password)) R += 26;
    if(/[0-9]/.test(password)) R += 10;
    if(/[`~!@#$%^&*()_=+\[\]{}|\\;:"'<>,.?/-]/.test(password)) R += 33;

    entropy = Math.round(L * (Math.log2(R)));
    entropyScore.textContent = entropy;
}

