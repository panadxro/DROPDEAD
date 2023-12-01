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
/* let addBtns = d.querySelectorAll('.add');
let delBtns = d.querySelectorAll('.del'); */
let filtros = d.querySelectorAll('#filtros a');

/* Productos componentes*/
const productosContenedor = d.getElementById('productos');
const subtotalPrecio = document.getElementById('subtotal-precio').querySelector('span');

/* Carrito componentes */
const listaCarrito = document.getElementById('lista-carrito');
const itemProducto = listaCarrito.children;

productos.forEach(producto => {
  const card = d.createElement('article');
  card.classList.add('card', 'text-center');
  /* card.dataset.bsToggle = 'modal';
  card.dataset.bsTarget = '#modal4'; */

  const imagen = d.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  const categoria = d.createElement('p');
  categoria.textContent = producto.categoría;

  const titulo = d.createElement('h3');
  titulo.textContent = producto.nombre;

  const descripcion = d.createElement('p');
  descripcion.textContent = producto.descripcion;

  const precio = d.createElement('p');
  const precioSpan = d.createElement('span');
  precioSpan.textContent = producto.precio;
  precio.appendChild(d.createTextNode('Precio: $'));
  precio.appendChild(precioSpan);

  const addButton = d.createElement('button');
  addButton.classList.add('add');
  addButton.dataset.id = producto.id;
  addButton.dataset.val = producto.precio;
  addButton.dataset.cat = producto.categoría;
  addButton.innerHTML = 'Agregar al carrito';
  addButton.addEventListener('click', () => agregarAlCarrito(producto));

  card.appendChild(imagen);
  card.appendChild(categoria);
  card.appendChild(titulo);
  card.appendChild(descripcion);
  card.appendChild(precio);
  card.appendChild(addButton);

  // Agregar la tarjeta al contenedor principal
  productosContenedor.appendChild(card);
});

/* Agregar item carrito */
 function agregarAlCarrito(producto) {
  /* Lista */
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

  /* Info */
  
  delButton.addEventListener('click', () => eliminarDelCarrito(listItem));

  listItem.appendChild(descripCar);
  listItem.appendChild(delButton);
  listaCarrito.appendChild(listItem);
  
}


function eliminarDelCarrito(item) {
  listaCarrito.removeChild(item);

}

/* Carrito info */
