const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');

function showValidationIcon(input, isValid) {
    const icon = input.parentElement.querySelector('.validation-icon');
    icon.innerHTML = isValid ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-x-circle-fill"></i>';
    icon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(id) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// VALIDATION FUNCTIONS
function validateName() {
    const input = document.getElementById('fullName');
    const name = input.value.trim();
    if (name.length < 5) {
        showError('nameError', 'Name must be at least 5 characters.');
        showValidationIcon(input, false);
        return false;
    }
    clearError('nameError');
    showValidationIcon(input, true);
    return true;
}

function validateEmail() {
    const input = document.getElementById('email');
    const email = input.value.trim();
    if (!email.includes('@')) {
        showError('emailError', "Enter a valid email with '@'.");
        showValidationIcon(input, false);
        return false;
    }
    clearError('emailError');
    showValidationIcon(input, true);
    return true;
}

function validatePhone() {
    const input = document.getElementById('phone');
    const phone = input.value.trim();
    if (phone.length !== 10 || phone === "1234567890" || isNaN(phone)) {
        showError('phoneError', 'Enter a valid 10-digit phone number.');
        showValidationIcon(input, false);
        return false;
    }
    clearError('phoneError');
    showValidationIcon(input, true);
    return true;
}

function validatePassword() {
    const input = document.getElementById('password');
    const password = input.value;
    const name = document.getElementById('fullName').value.trim().toLowerCase();
    if (password.length < 8 || password.toLowerCase() === "password" || password.toLowerCase() === name) {
        showError('passwordError', "Password must be at least 8 characters, not 'password' or your name.");
        showValidationIcon(input, false);
        return false;
    }
    clearError('passwordError');
    showValidationIcon(input, true);
    return true;
}

function validateConfirmPassword() {
    const input = document.getElementById('confirmPassword');
    const password = document.getElementById('password').value;
    if (input.value !== password || input.value === '') {
        showError('confirmPasswordError', 'Passwords do not match.');
        showValidationIcon(input, false);
        return false;
    }
    clearError('confirmPasswordError');
    showValidationIcon(input, true);
    return true;
}

// SHOW / HIDE PASSWORD
function togglePassword(fieldId, toggleElement) {
    const field = document.getElementById(fieldId);
    const icon = toggleElement.querySelector('i');
    if (field.type === "password") {
        field.type = "text";
        icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
        field.type = "password";
        icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
}

// CHECK FORM VALIDITY
function checkFormValidity() {
    const isValid = validateName() && validateEmail() && validatePhone() && validatePassword() && validateConfirmPassword();
    submitBtn.disabled = !isValid;
    return isValid;
}

form.addEventListener('input', checkFormValidity);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (checkFormValidity()) {
        alert("Form submitted successfully!");
        form.reset();
        submitBtn.disabled = true;
        document.querySelectorAll('.validation-icon').forEach(icon => icon.innerHTML = '');
    }
});
