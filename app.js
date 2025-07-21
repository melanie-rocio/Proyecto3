// Declara un array para almacenar datos iniciales de los usuarios
let usuarios = [
  { id: 1, nombre: "Juan", edad: 25, email: "juan@mail.com" },
  { id: 2, nombre: "Ana", edad: 30, email: "ana@mail.com" },
];

const saludo = document.getElementById("saludo"); // Referencia al elemento con id="saludo"
const lista = document.getElementById("usuarios-lista"); // Referencia al elemento de la lista de usuarios
const form = document.getElementById("form-usuario"); // Referencia al formulario de registro de usuarios

//------------------------------------------------------------------------------------------------------------------------------------- Saludo personalizado

// Recupera el nombre del usuario de localStorage o lo solicita mediante un prompt
let nombreGuardado = localStorage.getItem("nombreUsuario");

if (!nombreGuardado) {
  nombreGuardado = prompt("¿Cuál es tu nombre?");
  localStorage.setItem("nombreUsuario", nombreGuardado);
}
// Mostrar el saludo personalizado
saludo.textContent = `¡Bienvenida, ${nombreGuardado}!`;

//------------------------------------------------------------------------------------------------------------------------------------- Lista de Usuarios
// Cargar usuarios guardados del localStorage
function cargarUsuariosDesdeStorage() {
  const guardados = localStorage.getItem("usuarios"); //Busca en el localStorage si hay algo guardado con la clave "usuarios".
  if (guardados) {
    //verifica si guardados no está vacío o nulo
    usuarios = JSON.parse(guardados); //Si encontró datos guardados convierte ese texto en un array de objetos
  }
}

// Guardar usuarios en localStorage
function guardarUsuariosEnStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios)); //Convierte el array usuarios a texto y lo guarda en el localStorage bajo la clave "usuarios"
}

// Define una función para mostrar los usuarios en la lista
function mostrarUsuarios() {
  lista.innerHTML = ""; // Limpia el contenido actual de la lista
  let i = 0;
  for (let user of usuarios) {
    const li = document.createElement("li"); // Crea un nuevo elemento <li>
    li.innerHTML = `<strong>${user.nombre}</strong><br>${user.edad} años<br>${user.email}<br> 
        <button class="eliminar" data-index="${i}">X</button>`; // Establece el texto del elemento
    lista.appendChild(li); // Añade el elemento <li> a la lista
    i++;
  }
  // Agregá los eventos a cada botón de eliminar
  const botonEliminar = document.querySelectorAll(".eliminar");
  botonEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const indice = e.target.dataset.index;
      eliminarUsuario(indice);
    });
  });
}

function eliminarUsuario(indice) {
  usuarios.splice(indice, 1); // Borra 1 usuario en la posición indicada
  guardarUsuariosEnStorage(); // Guarda el cambio en localStorage
  mostrarUsuarios(); // Vuelve a mostrar la lista
}
// Llama a la función para mostrar los usuarios al cargar la página
cargarUsuariosDesdeStorage();
mostrarUsuarios();

//------------------------------------------------------------------------------------------------------------------------------------- Agregar Nuevo Usuario
// Añade un manejador de evento para el envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = document.getElementById("edad").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validación de campos vacíos
  if (!nombre) {
    alert("El nombre no puede estar vacío.");
    return;
  }
  if (!email.includes("@")) {
    alert("El email debe contener '@'.");
    return;
  }
  if (isNaN(edad) || edad <= 0) {
    alert("La edad debe ser un número mayor a 0.");
    return;
  }

  // Validación de email duplicado
  const duplicado = usuarios.some((u) => u.email === email);
  if (duplicado) {
    alert("Ese email ya fue registrado.");
    return;
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
    email,
  };

  // Agregar y guardar
  usuarios.push(nuevoUsuario);
  guardarUsuariosEnStorage();
  mostrarUsuarios();
  form.reset();
});

// ----------------------------------------------------------------------------------------- Botón para generar un usuario aleatorio desde la API 
const btnGenerar = document.getElementById("generar");
btnGenerar.addEventListener("click", () => {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
      const user = data.results[0];
      const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: `${user.name.first}`,
        edad: user.dob.age,
        email: user.email,
      };

      usuarios.push(nuevoUsuario);
      guardarUsuariosEnStorage();
      mostrarUsuarios();
    })
    .catch((error) => {
      console.error("Error al obtener usuario:", error);
      alert("No se pudo generar un usuario.");
    });
});
