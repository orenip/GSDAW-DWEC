document.addEventListener("DOMContentLoaded", function () {
    const calculatorContainer = document.createElement("div");
    calculatorContainer.style.display = "flex";
    calculatorContainer.style.flexDirection = "column";
    calculatorContainer.style.alignItems = "center";
    calculatorContainer.style.width = "400px";
    calculatorContainer.style.margin = "20px";

    const validationCodeContainer = document.createElement("div");
    validationCodeContainer.style.fontSize = "18px";
    validationCodeContainer.textContent = "Código de validación";

    const calculatorButtonsContainer = document.createElement("div");
    calculatorButtonsContainer.style.display = "flex";
    calculatorButtonsContainer.style.flexDirection = "column";

    const resultContainer = document.createElement("div");
    resultContainer.style.marginTop = "10px";
    resultContainer.style.fontSize = "18px";
    resultContainer.style.textAlign = "right";

    const buttonsLayout = [
        ["B", "3", "A"],
        ["4", "6", "5"],
        ["1", "2", "C"],
    ];

    buttonsLayout.forEach(row => {
        const buttonRow = document.createElement("div");
        buttonRow.style.display = "flex";
        buttonRow.style.justifyContent = "space-between";

        row.forEach(buttonValue => {
            const button = document.createElement("button");
            button.textContent = buttonValue;
            button.style.width = "30px";
            button.style.height = "30px";
            button.style.fontSize = "14px";
            button.style.margin = "5px";
            button.onclick = function () {
                resultContainer.textContent += "*";
                resultContainer.textContent = resultContainer.textContent.slice(0, -1) + buttonValue;
            };
            buttonRow.appendChild(button);
        });

        calculatorButtonsContainer.appendChild(buttonRow);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.width = "30px";
    deleteButton.style.height = "30px";
    deleteButton.style.fontSize = "14px";
    deleteButton.style.margin = "5px";
    deleteButton.onclick = function () {
        resultContainer.textContent = resultContainer.textContent.slice(0, -1);
    };

    const validateButton = document.createElement("button");
    validateButton.textContent = "Validar";
    validateButton.style.width = "70px";
    validateButton.style.height = "30px";
    validateButton.style.fontSize = "14px";
    validateButton.style.margin = "5px";
    validateButton.onclick = function () {
        const userCode = resultContainer.textContent;
        if (userCode === validationCode) {
            resultContainer.textContent = "¡Código correcto!";
            resultContainer.style.color = "green";
        } else {
            resultContainer.textContent = "Código incorrecto. Inténtalo de nuevo.";
            resultContainer.style.color = "red";
        }
    };

    calculatorContainer.appendChild(validationCodeContainer);
    calculatorContainer.appendChild(calculatorButtonsContainer);
    calculatorContainer.appendChild(resultContainer);
    calculatorContainer.appendChild(deleteButton);
    calculatorContainer.appendChild(validateButton);

    const validationCode = generateRandomCode();
    validationCodeContainer.textContent = `Código: ${validationCode}`;

    function generateRandomCode() {
        const allowedChars = "123456ABC";
        let randomCode = "";
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            randomCode += allowedChars[randomIndex];
        }
        return randomCode;
    }

    document.body.appendChild(calculatorContainer);
});