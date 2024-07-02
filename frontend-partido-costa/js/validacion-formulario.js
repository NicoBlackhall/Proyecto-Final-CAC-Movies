const formContac = document.querySelector("#formContac");

const validarFormulario = (event) => {
    event.preventDefault();

    const text = document.querySelector("#text")
    const number = document.querySelector("#number")
    const email = document.querySelector("#email")
    const asunto = document.querySelector("#asunto")
    const mensaje = document.querySelector("#mensaje")
    let validation = true;

    if(text.value.trim() == ""){
        text.classList.add("error2")
        document.querySelector("#error-text").textContent="--- Debe completar este campo. ↧"
        validation = false;
    }
   
    if(number.value.trim() == ""){
        number.classList.add("error2")
        document.querySelector("#error-number").textContent="--- Debe completar este campo. ↧"
        validation = false;
    }

    if(email.value.trim() == ""){
        email.classList.add("error2")
        document.querySelector("#error-email").textContent="--- Debe completar este campo. ↧"
        validation = false;
    }

    if(asunto.value.trim() == ""){
        asunto.classList.add("error2")
        document.querySelector("#error-asunto").textContent="--- Debe completar este campo. ↧"
        validation = false;
    }

    if(mensaje.value.trim() == ""){
        mensaje.classList.add("error2")
        document.querySelector("#error-mensaje").textContent="--- Debe completar este campo. ↧"
        validation = false;
    }

    if(validation){
        formContac.submit()
    } else{
        return false;
    }
}

formContac.addEventListener("submit", validarFormulario)