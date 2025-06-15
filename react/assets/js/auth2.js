const authForm = document.getElementById("my-form");
const error = document.getElementById("error");
const elements = authForm.querySelectorAll("input");



authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm()) {
    //error.textContent = "Please fill in all fields";
  } else {
    error.textContent = "Formulario enviado correctamente";
    // Perform form submission logic here
  }
});

function validateForm() {
  let isValid = true;
  for (let i = 0; i < elements.length; i++) {
   if (!validateInputs(elements[i])) {
      isValid = false;
    }
  }
  return isValid;
}

function validateInputs(input){
  const getValue = input.value.trim();
  const type = input.getAttribute("type");
  let message = "";
  let validate = true;
  switch (type) {
    case "text":
      var myRe = /^[a-zA-Z0-9]{3,10}$/;
      validate = myRe.test(getValue);
      if (!validate) {
      message = "Please enter a valid username";
    }
      break;
    case "email":
      if (getValue === "" || getValue === null) {
        message = "Please enter a valid email";
        validate = false;
      } else {

        validate = true;
      }
      break;
    case "password": //  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*@)[a-zA-Z0-9@]{6}$/
      if (getValue.length < 6) {
        message = "Please enter a valid password";
        validate = false;
      } else {
        validate = true;
      }
      break;
  }
  if (!validate) {
    error.textContent = message;
    input.classList.add("error");
    return false;
  } else {

    // error.textContent = "";
    input.classList.remove("error");

    return true;
  }

} 