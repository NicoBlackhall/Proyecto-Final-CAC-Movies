// En el script validation-register.js trabajar con métodos de JavaScript para seleccionar elementos HTML del documento utilizando sus identificadores. La idea es poder capturar en el script datos que se ingresen por formulario:

// Para ello, el archivo validation-register.html cuenta con los siguientes IDS para identificar los input: #firstname, #lastname, #email, #password, #error-firstname, #error-lastname, #error-password.

const formRegister = document.querySelector("#formRegister");

// En JavaScript, document es un objeto que representa el modelo de objetos del documento (DOM) de la página web actual. Este objeto proporciona métodos y propiedades que te permiten interactuar con los elementos HTML y otros componentes de la página.

// El método querySelector() es uno de esos métodos proporcionados por el objeto document. Se utiliza para seleccionar y recuperar elementos del DOM utilizando selectores CSS. Cuando aplicas querySelector() al objeto document, estás solicitando al navegador que busque un elemento que coincida con el selector especificado dentro de todo el documento HTML.

// En el caso de const formRegister = document.querySelector("#formRegister");, estás utilizando querySelector() para seleccionar un elemento HTML que tenga el atributo id igual a "formRegister". El elemento seleccionado se almacenará en la variable formRegister, lo que te permitirá acceder a él y manipularlo en tu código JavaScript.


// En primer lugar, se crea una función anónima de flecha para validar el formulario de la página web utilizando JavaScript.

const validarFormulario = (event) => {

    // event.preventDefault(), se utiliza para prevenir el comportamiento predeterminado de un evento, en este caso, prevenir el envío predeterminado del formulario cuando se presiona el botón "Enviar". Esto significa que el formulario no se envía de manera predeterminada cuando se activa el evento de envío, lo que permite realizar validaciones personalizadas antes de enviar los datos al servidor.
    event.preventDefault();

    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    let validation = true;

    if(firstname.value.trim() ===""){
        // Este tipo de condicional verifica si el campo de nombre (firstname) está vacío (no tiene caracteres después de recortar espacios en blanco). Si es así, se ejecuta el código dentro del bloque {}.

        // alert("El campo del nombre no debe estar vacio")
        firstname.classList.add("error");
        document.querySelector("#error-firstname").textContent ="Debe completar el campo Nombre";
        validation = false;
    }
    if(lastname.value.trim()===""){
        document.querySelector("#error-lastname").textContent="Debe completar el campo apellido";
        lastname.classList.add("error");
        validation= false;
    }
    if(email.value.trim()===""){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-email").textContent='Debe completar el campo Email';
        email.classList.add('error')
        validation=false;
    }
    if(password.value.trim()===""){
        // alert("Los campos Nombre, Apellido, Email y Password son obligatorios")
        document.querySelector("#error-password").textContent='Debe completar el campo contraseña';
        password.classList.add('error');
        validation=false;
    }else if(password.value.length < 6 || password.value.length > 12){
        document.querySelector("#error-password").textContent="LA contraseña debe contener entre 6 y 12 caracteres";
        password.classList.add("error");
        validation=false;
        // La primera condición es similar a lo anterior, sin embargo, este código en la  segunda condición evalúa si la longitud de la contraseña no está en el rango permitido (entre 6 y 12 caracteres). Si esta condición es verdadera, se ejecuta el código dentro de este bloque else if.
    }
    

    if(validation){
        formRegister.submit()
    } else{
        return false;
    }
    // Al final del proceso de validación, se usa la bandera validation para decidir si se debe enviar o no el formulario. Si la bandera es true (significa que la validación fue exitosa), se envía el formulario (formRegister.submit()). Si es false, se devuelve false, lo que previene el envío del formulario y detiene el proceso.

}

formRegister.addEventListener("submit",validarFormulario)
// formRegister.addEventListener('submit', validarFormulario), establece un "escuchador" o "listener" en el formulario (formRegister) que estará atento al evento de envío (submit).
// Cuando el formulario se envía, se llama a la función validarFormulario para realizar la validación.

