document.addEventListener("DOMContentLoaded", function () {
    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.disabled = true;
    codeInput.id = "codeInput";
    generateRandomCode();
    
    const consoleButtons = document.createElement("div");
    consoleButtons.id = "consoleButtons";
    generateRandomButtons();

    const resultInput = document.createElement("input");
    resultInput.type = "password";
    resultInput.disabled = true;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.onclick = deleteLastCharacter;

    const validateButton = document.createElement("button");
    validateButton.textContent = "Validar";
    validateButton.onclick = validateCode;

    const resultContainer = document.createElement("div");
    resultContainer.id = "resultContainer";

    document.body.appendChild(codeInput);
    document.body.appendChild(consoleButtons);
    document.body.appendChild(resultInput);
    document.body.appendChild(deleteButton);
    document.body.appendChild(validateButton);
    document.body.appendChild(resultContainer);

    function generateRandomCode() {
        const allowedChars = "123456ABC";
        let randomCode = "";
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            randomCode += allowedChars[randomIndex];
        }
        codeInput.value = randomCode;
    }

    function generateRandomButtons() {
        const allowedChars = "123456ABC";
        const shuffledChars = allowedChars.split('').sort(() => Math.random() - 0.5);

        for (const char of shuffledChars) {
            const button = document.createElement("button");
            button.textContent = char;
            button.onclick = function () {
                resultInput.value += "*";
                resultInput.value = resultInput.value.slice(0, -1) + char;
            };
            consoleButtons.appendChild(button);
        }
    }

    function deleteLastCharacter() {
        resultInput.value = resultInput.value.slice(0, -1);
    }

    function validateCode() {
        const userCode = resultInput.value;
        const generatedCode = codeInput.value;

        if (userCode === generatedCode) {
            resultContainer.textContent = "¡Código correcto!";
            resultContainer.style.color = "green";
        } else {
            resultContainer.textContent = "Código incorrecto. Inténtalo de nuevo.";
            resultContainer.style.color = "red";
        }
    }
});
