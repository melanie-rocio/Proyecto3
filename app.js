 
  // Declara un array para almacenar datos iniciales de los usuarios
  let usuarios = [
    { id: 1, nombre: "Juan", edad: 25, email: "juan@mail.com" },
    { id: 2, nombre: "Ana", edad: 30, email: "ana@mail.com" },
  ];
    
  const saludo = document.getElementById("saludo");        // Referencia al elemento con id="saludo"
  const lista = document.getElementById("usuarios-lista");   // Referencia al elemento de la lista de usuarios
  const form = document.getElementById("form-usuario"); // Referencia al formulario de registro de usuarios
  
//------------------------------------------------------------------------------------------------------------------------------------- Saludo personalizado
  
    // Recupera el nombre del usuario de localStorage o lo solicita mediante un prompt
    let nombreGuardado = localStorage.getItem("nombreUsuario");
  
    if (!nombreGuardado) {
    nombreGuardado = prompt("¿Cuál es tu nombre?");
    localStorage.setItem("nombreUsuario", `¡Bienvenida, ${nombreGuardado}!`);
    }
    // Mostrar el saludo personalizado
    saludo.textContent = localStorage.getItem("nombreUsuario");
    
//------------------------------------------------------------------------------------------------------------------------------------- Lista de Usuarios

  // Define una función para mostrar los usuarios en la lista
  function mostrarUsuarios() {
    lista.innerHTML = ""; // Limpia el contenido actual de la lista
    for (let i = 0; i < usuarios.length; i++) { // Itera sobre cada usuario
      const user = usuarios[i];
      const li = document.createElement("li"); // Crea un nuevo elemento <li>
      li.textContent = `${user.nombre}\n${user.edad} años\n${user.email}`; // Establece el texto del elemento
      lista.appendChild(li); // Añade el elemento <li> a la lista
    }
}
//------------------------------------------------------------------------------------------------------------------------------------- Agregar Nuevo Usuario
  // Añade un manejador de evento para el envío del formulario
  form.addEventListener("submit", function (boton) {
    boton.preventDefault(); // Evita que la página se recargue al enviar el formulario

    const campos = ["nombre", "edad", "email"]; // Campos esperados del formulario
    let nuevoUsuario = {
      id: usuarios.length + 1, // Asigna un ID incremental al nuevo usuario
    };

    // Itera sobre los campos y recoge los valores ingresados
    for (let i = 0; i < campos.length; i++) {
      let campo = campos[i];
      let valor = document.getElementById(campo).value; // Obtiene el valor del campo por su ID
      nuevoUsuario[campo] = valor; // Agrega el valor al objeto del nuevo usuario
    }

    usuarios.push(nuevoUsuario); // Añade el nuevo usuario al array
    mostrarUsuarios(); // Actualiza la lista mostrada en el DOM
    form.reset(); // Limpia los campos del formulario
  });

  // Llama a la función para mostrar los usuarios al cargar la página
  mostrarUsuarios();
