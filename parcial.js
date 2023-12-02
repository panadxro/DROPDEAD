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
        categoría: '2',
    },
    {
        id: 2,
        nombre: 'Producto2',
        descripcion: 'Descripción del producto',
        precio: 2,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: '3',
    },
    {
        id: 3,
        nombre: 'Producto3',
        descripcion: 'Descripción del producto',
        precio: 3,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: '1',
    },
    {
        id: 4,
        nombre: 'Producto4',
        descripcion: 'Descripción del producto',
        precio: 4,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: '2',
    },
    {
        id: 5,
        nombre: 'Producto5',
        descripcion: 'Descripción del producto',
        precio: 5,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: '1',
    },
    {
        id: 6,
        nombre: 'Producto6',
        descripcion: 'Descripción del producto',
        precio: 6,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoría: '3'
    },
];

// Document:
const d = document;

// Objetos:
let info = d.querySelector('#info-carrito');
let filtros = d.querySelectorAll('#filtros a');
let products;

/* Productos */
products = d.querySelector('#productos');

/* Carrito componentes */
const listaCarrito = document.getElementById('lista-carrito');
let itemProducto = listaCarrito.children;

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
  // card.appendChild(categoria);

  const titulo = d.createElement('h3');
  titulo.textContent = producto.nombre;
  // card.appendChild(titulo);
  
  const descripcion = d.createElement('p');
  descripcion.textContent = producto.descripcion;
  // card.appendChild(descripcion);
  
  const precio = d.createElement('p');
  const precioSpan = d.createElement('span');
  precioSpan.textContent = producto.precio;
  precio.appendChild(d.createTextNode('Precio: $'));
  precio.appendChild(precioSpan);
  // card.appendChild(precio);
  
  
  let addBtn = d.createElement('button');
  addBtn.classList.add('add');
  addBtn.dataset.id = producto.id;
  addBtn.dataset.val = producto.precio;
  addBtn.dataset.cat = producto.categoría;
  addBtn.innerHTML = 'Agregar al carrito';

  addBtn.addEventListener('click', () => agregarAlCarrito(producto));
  card.appendChild(addBtn);

});
let addBtns = d.querySelectorAll('.add');

let cantidadGeneral = 0;
let cantidadesIndividuales = {};

/* Agregar item carrito */
 function agregarAlCarrito(producto) {
  // Lista
  const listItem = d.createElement('li');
  listItem.classList.add('item-producto');
  listaCarrito.appendChild(listItem);

  const descripCar = d.createElement('div');
  descripCar.classList.add('descrip-car');
  listItem.appendChild(descripCar);

  const miniportada = d.createElement('img');
  miniportada.classList.add('miniportada');
  miniportada.src = producto.imagen;
  miniportada.alt = producto.nombre;
  descripCar.appendChild(miniportada);
  

  const tituloCar = d.createElement('h3');
  tituloCar.classList.add('titulo-car');
  tituloCar.innerHTML = `${producto.nombre} <br> $<span>${producto.precio}</span>`;
  descripCar.appendChild(tituloCar);


  const delBtn = d.createElement('button');
  delBtn.classList.add('del');
  delBtn.dataset.id = producto.id;
  delBtn.dataset.val = producto.precio;
  delBtn.dataset.cat = producto.categoría;
  delBtn.innerHTML = 'x';
  listItem.appendChild(delBtn);
  
  
  delBtn.addEventListener('click', () => eliminarDelCarrito(listItem));
  
  // Info
  mostrarCarrito();
}


let delBtns = d.querySelectorAll('.del');

function eliminarDelCarrito(item) {
  const id = parseInt(item.querySelector('.del').dataset.id);
  const val = parseInt(item.querySelector('.del').dataset.val);

  // Elimina el elemento del carrito
  listaCarrito.removeChild(item);

  // Actualiza la cantidad y el total en el carrito
  const indiceId = carrito.productosIds.indexOf(id);
  if (indiceId !== -1 && carrito.cantidades[indiceId] > 0) {
    // Si existe, actualiza el índice de la cantidad y el total
    carrito.cantidades[indiceId]--;
    carrito.total = parseInt(carrito.total) - val;
  }

  // Muestra el detalle del carrito actualizado
  mostrarCarrito();
}

// Acción de los botones para quitar productos:
for (let btn of delBtns) {
  btn.addEventListener('click', (e) => {
    const item = e.target.closest('.item-producto');
    eliminarDelCarrito(item);
  });
}


let carrito = {
    productosIds: [],
    cantidades: [],
    total: 0,
};

const mostrarCarrito = () => {
    // Muestro el detalle del carrito:
    info.innerHTML = `
    Productos: ${carrito.productosIds} <br/>
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


// Reseteo:
let reset = d.querySelector('#reset');
reset.addEventListener('click', () => {
    carrito = {
        productosIds: [],
        cantidades: [],
        total: 0,
    };
    cantidadGeneral = 0;
    cantidadesIndividuales = {};

    
    while (listaCarrito.hasChildNodes()) {
      listaCarrito.removeChild(listaCarrito.firstChild);
    }
    mostrarCarrito();
});


// Mostrar carrito inicial:
mostrarCarrito();

  /* card.dataset.bsToggle = 'modal';
  card.dataset.bsTarget = '#modal4'; */
