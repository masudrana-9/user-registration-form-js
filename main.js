function formSubmit() {
    const registrationForm = document.getElementById('registration-form')
    
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault()

        // Get All inputs Elements and convert HTMLCollection to Array
        let inputs = [...this.elements]

        // Reset previous error state
        resetErrors(inputs)

        let isFormValid = true
        let data = {}

        inputs.forEach(input => {
            if (input.type === 'submit') return true; // Skip the submit button

            if (input.type === 'radio' && !validationRadio(input)) {
                isFormValid = false
            } else if (input.type !== 'radio' && !validation(input)) {
                isFormValid = false
            } else if (input.type === 'radio' && input.checked) {
                // Add the radio button value to the data object only if it's checked
                data[input.name] = input.value
            } else if (input.type !== 'radio') {
                data[input.name] = input.value
            }
        })

        // If the form is valid, log the data object
        if (isFormValid) {
            console.log(data)
        }
    })
}

formSubmit()

function validation(input) {
    let isValid = true
  
    if (input.value.trim() === '') {
        setError(input, `${formatMessage(input.name)} Must Not Be Empty!`)
        isValid = false
    } else if (input.name === 'email' && input.value !== '' && !emailValidation(input.value)) {
        setError(input, 'Please Provide a Valid Email!')
        isValid = false
    } else if (input.name === 'password' && input.value !== '') {
        let errMessage = lengthValidation({
            inputName: input.name,
            inputValue: input.value,
            minChar: 6,
            maxChar: 20
        })
        if (errMessage) {
            setError(input, errMessage)
            isValid = false
        }
    } else if (input.name === 'firstname' && input.value !== '') {
        let errMessage = lengthValidation({
            inputName: input.name,
            inputValue: input.value,
            minChar: 3,
            maxChar: 12
        })
        if (errMessage) {
            setError(input, errMessage)
            isValid = false
        }
    } else if (input.name === 'lastname' && input.value !== '') {
        let errMessage = lengthValidation({
            inputName: input.name,
            inputValue: input.value,
            minChar: 3,
            maxChar: 12
        })
        if (errMessage) {
            setError(input, errMessage)
            isValid = false
        }
    }

    return isValid
}

// Handle radio button validation (checking if one is selected)
function validationRadio(input) {
    let isValid = false;
    const radioGroup = document.getElementsByName(input.name);
    radioGroup.forEach(radio => {
        if (radio.checked) {
            isValid = true;
        }
    });

    if (!isValid) {
        setError(input, `${formatMessage(input.name)} Must Be Selected!`)
    }
    return isValid;
}

function lengthValidation(data) {
    let { inputName, inputValue, minChar, maxChar } = data

    if (inputValue.length < minChar) {
        return `${formatMessage(inputName)} Must Not Be Less Than ${minChar} Characters`
    } else if (inputValue.length > maxChar) {
        return `${formatMessage(inputName)} Must Not Be More Than ${maxChar} Characters`
    }

    return null
}

function formatMessage(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function emailValidation(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function setError(input, message) {
    let parent = input.parentNode
    parent.classList.add('error')
    let smallText = parent.querySelector('small')
    smallText.textContent = message
}

function resetErrors(inputs) {
    inputs.forEach(input => {
        let parent = input.parentNode
        parent.classList.remove('error')
        let smallText = parent.querySelector('small')
        smallText.textContent = ''
    })
}