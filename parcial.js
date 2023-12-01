'use strict';

/*
 *  APELLIDOS
 */

let productos = [
    {
        id: 1,
        nombre: 'Producto1',
        descripcion: 'Descripción del producto',
        precio: 1,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: 'Nombre de la categoría',
    },
    {
        id: 2,
        nombre: 'Producto2',
        descripcion: 'Descripción del producto',
        precio: 2,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: 'Nombre de la categoría',
    },
    {
        id: 3,
        nombre: 'Producto3',
        descripcion: 'Descripción del producto',
        precio: 3,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: 'Nombre de la categoría',
    },
    {
        id: 4,
        nombre: 'Producto4',
        descripcion: 'Descripción del producto',
        precio: 4,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: 'Nombre de la categoría',
    },
    {
        id: 5,
        nombre: 'Producto5',
        descripcion: 'Descripción del producto',
        precio: 5,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: 'Nombre de la categoría',
    },
    {
        id: 6,
        nombre: 'Producto6',
        descripcion: 'Descripción del producto',
        precio: 6,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: 'Nombre de la categoría'
    },
];

// Document:
const d = document;

// Objetos:
let info = d.querySelector('#info-carrito');
let reset = d.querySelector('#reset');
let addBtns = d.querySelectorAll('.add');
let delBtns = d.querySelectorAll('.del');
let filtros = d.querySelectorAll('#filtros a');

let products;

/* Productos */
products = d.querySelector('#productos');

/* Carrito componentes */
/* const listaCarrito = document.getElementById('lista-carrito');
const itemProducto = listaCarrito.children; */

productos.forEach((producto) => {
  const card = d.createElement('article');
  card.classList.add('card', 'text-center');
  products.append(card);


  const imagen = d.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  card.append(imagen);

  const categoria = d.createElement('p');
  categoria.textContent = producto.categoría;
  card.appendChild(categoria);

  const titulo = d.createElement('h3');
  titulo.textContent = producto.nombre;
  card.appendChild(titulo);
  
  const descripcion = d.createElement('p');
  descripcion.textContent = producto.descripcion;
  card.appendChild(descripcion);
  
  const precio = d.createElement('p');
  const precioSpan = d.createElement('span');
  precioSpan.textContent = producto.precio;
  precio.appendChild(d.createTextNode('Precio: $'));
  precio.appendChild(precioSpan);
  card.appendChild(precio);
  
  
 /*  addBtns = d.createElement('button');
  addBtns.classList.add('add');
  addBtns.dataset.id = producto.id;
  addBtns.dataset.val = producto.precio;
  addBtns.dataset.cat = producto.categoría;
  addBtns.innerHTML = 'Agregar al carrito';
  addBtns.addEventListener('click', () => agregarAlCarrito(producto));

  card.appendChild(addBtns); */

  // Agregar la tarjeta al contenedor principal
//   productosContenedor.appendChild(card);
});

/* Agregar item carrito */
/*  function agregarAlCarrito(producto) {
  // Lista
  const listItem = document.createElement('li');
  listItem.classList.add('item-producto');

  const descripCar = document.createElement('div');
  descripCar.classList.add('descrip-car');

  const miniportada = document.createElement('img');
  miniportada.classList.add('miniportada');
  miniportada.style.backgroundColor = '#FF0';

  const tituloCar = document.createElement('h3');
  tituloCar.classList.add('titulo-car');
  tituloCar.innerHTML = `${producto.nombre} <br> $<span>${producto.precio}</span>`;

  descripCar.appendChild(miniportada);
  descripCar.appendChild(tituloCar);

  const delButton = document.createElement('button');
  delButton.classList.add('del');
  delButton.dataset.id = producto.id;
  delButton.dataset.val = producto.precio;
  delButton.dataset.cat = producto.categoría;
  delButton.innerHTML = 'x';

  // Info
  
  delButton.addEventListener('click', () => eliminarDelCarrito(listItem));

  listItem.appendChild(descripCar);
  listItem.appendChild(delButton);
  listaCarrito.appendChild(listItem);
  
} */


/* function eliminarDelCarrito(item) {
  listaCarrito.removeChild(item);

} */

let carrito = {
    productosIds: [],
    cantidades: [],
    total: 0,
};

const mostrarCarrito = () => {
    // Muestro el detalle del carrito:
    info.innerHTML = `
    Productos: ${carrito.productosIds} <br />
    Cantidades: ${carrito.cantidades} (${carrito.cantidades.reduce((acum, n) => acum + n, 0)})<br />
    Total: $${carrito.total}
    `;
    // mostrarCarritoUsuario();
};

// Acción de los botones para agregar productos:
for (let btn of addBtns) {
    btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);
        let val = parseInt(e.target.dataset.val);
        // Se verifica si ya existe el producto:
        let indiceId = carrito.productosIds.indexOf(id);
        if (indiceId != -1) {
            // Si existe, se actualiza el índice de la cantidades:
            carrito.cantidades[indiceId]++;
        } else {
            // Si no existe, se crea el índice en productosId y cantidades:
            carrito.productosIds.push(id);
            carrito.cantidades.push(1);
        }
        // Se actualiza el total:
        carrito.total = parseInt(carrito.total) + val;
        // Se muestra el detalle del carrito:
        mostrarCarrito();
    });
}

// Acción de los botones para quitar productos:
for (let btn of delBtns) {
    btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);
        let val = parseInt(e.target.dataset.val);
        // Se verifica si ya existe el producto:
        let indiceId = carrito.productosIds.indexOf(id);
        if (indiceId != -1) {
            // Verifico si llegó a cero:
            if (carrito.cantidades[indiceId] > 0) {
                // Si existe, actualizo el índice de la cantidad:
                carrito.cantidades[indiceId]--;
                // Actualizo el total:
                carrito.total = parseInt(carrito.total) - val;
            }
        }
        // Se muestra el detalle del carrito:
        mostrarCarrito();
    });
}

// Reseteo:
reset.addEventListener('click', (e) => {
    // Se limpia el carrito:
    carrito = {
        productosIds: [],
        cantidades: [],
        total: 0,
    };
    // Se muestra el detalle del carrito limpio:
    mostrarCarrito();
    // Opcionalmente, refrescar la página:
    // location.reload();
});


// Mostrar carrito inicial:
mostrarCarrito();

  /* card.dataset.bsToggle = 'modal';
  card.dataset.bsTarget = '#modal4'; */

  /*   card.appendChild(categoria);
  card.appendChild(titulo);
  card.appendChild(descripcion);
  card.appendChild(precio); */