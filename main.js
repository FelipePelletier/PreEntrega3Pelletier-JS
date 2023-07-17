const alumnos = [];

const calcularPromedio = (nota1, nota2) => (nota1 + nota2) / 2;

const mostrarAlumnosAprobados = () => {
  const tablaAprobados = document.getElementById("tablaAprobados");
  tablaAprobados.innerHTML = "";

  alumnos
    .filter((alumno) => calcularPromedio(alumno.nota1, alumno.nota2) >= 6)
    .forEach((alumno, i) => {
      const fila = `
              <tr>
                <th scope="row">${i + 1}</th>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.nota1}</td>
                <td>${alumno.nota2}</td>
                <td>${calcularPromedio(alumno.nota1, alumno.nota2)}</td>
              </tr>
            `;
      tablaAprobados.insertAdjacentHTML("beforeend", fila);
    });
};

const mostrarAlumnosDesaprobados = () => {
  const tablaDesaprobados = document.getElementById("tablaDesaprobados");
  tablaDesaprobados.innerHTML = "";

  alumnos
    .filter((alumno) => calcularPromedio(alumno.nota1, alumno.nota2) < 6)
    .forEach((alumno, index) => {
      const fila = `
              <tr>
                <th scope="row">${index + 1}</th>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.nota1}</td>
                <td>${alumno.nota2}</td>
                <td>${calcularPromedio(alumno.nota1, alumno.nota2)}</td>
              </tr>
            `;
      tablaDesaprobados.insertAdjacentHTML("beforeend", fila);
    });
};

const mostrarAlumnos = () => {
  mostrarAlumnosAprobados();
  mostrarAlumnosDesaprobados();
};

const agregarAlumno = (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreAlumno").value;
  const apellido = document.getElementById("apellidoAlumno").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);

  if (nombre && apellido && !isNaN(nota1) && !isNaN(nota2)) {
    const alumno = {
      nombre,
      apellido,
      nota1,
      nota2,
    };

    alumnos.push(alumno);

    document.getElementById("formulario").reset();

    mostrarAlumnos();
    guardarAlumnosEnLocalStorage();
  } else {
    alert(
      "Por favor, completa todos los campos y asegúrate de que las notas sean números."
    );
  }
};

const guardarAlumnosEnLocalStorage = () => {
  localStorage.setItem("alumnos", JSON.stringify(alumnos));
};

const cargarAlumnosDesdeLocalStorage = () => {
  const datosAlumnos = localStorage.getItem("alumnos");
  if (datosAlumnos) {
    alumnos.length = 0;
    alumnos.push(...JSON.parse(datosAlumnos));
    mostrarAlumnos();
  }
};

const borrarTablaAprobados = () => {
  const tablaAprobados = document.getElementById("tablaAprobados");
  tablaAprobados.innerHTML = "";
  alumnos.length = 0; // Vaciar el array de alumnos
  guardarAlumnosEnLocalStorage(); // Actualizar el almacenamiento local
};

const borrarTablaDesaprobados = () => {
  const tablaDesaprobados = document.getElementById("tablaDesaprobados");
  tablaDesaprobados.innerHTML = "";
  alumnos.length = 0;
  guardarAlumnosEnLocalStorage();
};

document.getElementById("formulario").addEventListener("submit", agregarAlumno);
document
  .getElementById("btnBorrarAprobados")
  .addEventListener("click", borrarTablaAprobados);
document
  .getElementById("btnBorrarDesaprobados")
  .addEventListener("click", borrarTablaDesaprobados);

document.addEventListener("DOMContentLoaded", cargarAlumnosDesdeLocalStorage);
