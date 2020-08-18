// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCurso = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// Even listeners
cargarEventListeners()

function cargarEventListeners(){
    // Dispara cuendo se presiona "agregar carrito"
    cursos.addEventListener('click', comprarCurso)

    // Cuando se elimina un curso el carrito
    carrito.addEventListener('click', eliminarCurso)

    // Al vacir carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

    // Al cargar el documento, mostrar el local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}


// Funciones

// Añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement
        
        leerDatosCurso(curso)
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }
    insertarCarrito(infoCurso)
}

// Muestra los datos seleccionados en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100 >
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;

    listaCurso.appendChild(row)
    guardarCursoLocalStorage(curso)
}

// Elimina curso del carrito
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement
        cursoId = curso.querySelector('a').getAttribute('data-id')
    }
    eliminarCursoLocalStorage(cursoId)
}

// Elimina los cursos del carrito
function vaciarCarrito() {
    while(listaCurso.firstChild) {
        listaCurso.removeChild(listaCurso.firstChild)
    }
    vaciarLocalStorage()
    return false;
}

// Almacena cursos en el carrito a local starage
function guardarCursoLocalStorage(curso) {
    let cursos

    cursos = obtenerCursosLocalStorage();

    cursos.push(curso)

    localStorage.setItem('cursos', JSON.stringify(cursos))
}

// Comprueba que haya elementos en el local storage
function obtenerCursosLocalStorage() {
    let cursosLS

    // Comprobamos si hay lago en el local storage
    if(localStorage.getItem('cursos') === null) {
        cursosLS = []
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'))
    }
    return cursosLS;
}

// 
function leerLocalStorage() {
    let cursosLS

    cursosLS = obtenerCursosLocalStorage()

    cursosLS.forEach(function(curso) {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100 />
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        listaCurso.appendChild(row)
    })
}

// Elimina el curso por el local storage
function eliminarCursoLocalStorage(curso) {
    let cursosLS

    cursosLS = obtenerCursosLocalStorage()

    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1)
        }
    })

    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

// Elimina todos los cursos del local storage
function vaciarLocalStorage() {
    localStorage.clear()
}