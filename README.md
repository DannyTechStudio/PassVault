# PassVault
A password manager web app built with HTML, CSS, and JavaScript. PassVault helps users generate strong passwords, check password strength, store and manage saved passwords, and toggle security options like encryption with a master password. The app is fully responsive for both desktop and mobile devices.

## Features
  ## 🔑Password Generator Page
Generate password(s) based on custom options:
Lowercase
Uppercase
Numbers
Symbols
Choose password length and number of passwords to generate.
Copy, save (with custom tag), or delete generated passwords.

  ## 📊Strength Checker Page

Check the strength of any password.
Displays:
Strength percentage
Category (Very Strong / Strong / Medium / Weak)
Entropy score
Provides tips & recommendations for creating stronger passwords.

  ## 🗂️History Page

View saved passwords with:
Custom tag/label
Date saved
Options to:
View (only if not encrypted)
Copy
Delete individual entries

  ## ⚙️Settings Page

Toggle Light/Dark Theme.
Enable/disable Encryption Mode:
When enabled, all saved passwords are encrypted with a Master Password (not stored anywhere in the system).
Passwords remain hidden in History until decrypted with the master password the Settings.
Delete/Clear all saved passwords.

  ## 🛡️Security Notes

Master Password is not stored in the system — only the users know it.
When encryption is enabled, saved passwords are inaccessible until decrypted.
Local storage is used to store saved data, secured with optional encryption.

  ## 📱Responsiveness

PassVault is fully responsive, optimized for mobile and desktop screens.

  ## 🛠️Tech Stack

Frontend: HTML5, CSS3, and Vanilla JavaScript with Bootstrap icons.
Storage: Browser LocalStorage (with optional encryption)

  ## 📸Screenshots
Pages screenshots here: generator, checker, history, settings, dark/light mode
<img width="1920" height="914" alt="PassVault password generator page light" src="https://github.com/user-attachments/assets/6be7f5c8-c5e3-4f2c-870b-2ac89d123376" />
<img width="1920" height="912" alt="PassVault strength checker page light" src="https://github.com/user-attachments/assets/3e829a46-d265-4b94-987a-d615e836f10f" />
<img width="1918" height="911" alt="PassVault saved password page light" src="https://github.com/user-attachments/assets/e285dbaa-06b6-4d06-9c8d-3edf0cc4c63f" />
<img width="1916" height="905" alt="PassVault setting page light" src="https://github.com/user-attachments/assets/701ba410-b239-4bf1-befd-65bc6ecf3e60" />
<img width="1920" height="911" alt="PassVault password generator page dark" src="https://github.com/user-attachments/assets/c1e08f77-51c4-43a6-9288-c7cec5a69b93" />
<img width="1914" height="912" alt="PassVault strength checker page dark" src="https://github.com/user-attachments/assets/18259750-3359-4d66-9b53-88bcdaa171c1" />
<img width="1915" height="914" alt="PassVault saved password page dark" src="https://github.com/user-attachments/assets/1631e588-b1ca-4bcc-8712-34650bf7db89" />
<img width="351" height="711" alt="PassVault_password_generator_page_mobile_view_light" src="https://github.com/user-attachments/assets/2d272091-d7aa-4698-99ba-6f0ee1beeb19" />
<img width="352" height="710" alt="PassVault_password_generator_page_mobile_view_dark" src="https://github.com/user-attachments/assets/7e91c2fd-19d1-4f83-85be-edf599bda4f7" />
<img width="353" height="707" alt="PassVault_strength_checker_page_mobile_view_light" src="https://github.com/user-attachments/assets/1ae4a998-b5eb-4c5e-9929-98406411c82d" />
<img width="351" height="711" alt="PassVault_strength_checker_page_mobile_view_dark" src="https://github.com/user-attachments/assets/386f84a2-01dc-42c2-aad3-91af71012392" />
<img width="353" height="708" alt="PassVault_saved_password_page_mobile_view_light" src="https://github.com/user-attachments/assets/4d993074-b3df-49be-8a2e-f8ee4f1ae03f" />
<img width="352" height="709" alt="PassVault_saved_password_page_mobile_view_dark" src="https://github.com/user-attachments/assets/f4918acd-13cd-45b2-a47e-ff36970ea120" />
<img width="352" height="709" alt="PassVault_setting_page_mobile_view_light" src="https://github.com/user-attachments/assets/1176426e-d4db-4cc4-a9c2-c69c26dea7fe" />
<img width="351" height="710" alt="PassVault_setting_page_mobile_view_dark" src="https://github.com/user-attachments/assets/1ac80d11-0b14-4bac-a0fb-32511468ee97" />

  ## 💻Installation & Usage

Clone the repository:
git clone https://github.com/dannytechstudio/passvault.git
Open index.html in your browser.
Start generating and managing your passwords securely.

  ## 📜License
This project is licensed under the MIT License — feel free to use and modify.
