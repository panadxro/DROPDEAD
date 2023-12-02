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
        categoria: 'Remera',
    },
    {
        id: 2,
        nombre: 'Producto2',
        descripcion: 'Descripción del producto',
        precio: 2,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoria: 'Buzo',
    },
    {
        id: 3,
        nombre: 'Producto3',
        descripcion: 'Descripción del producto',
        precio: 3,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoria: 'Campera',
    },
    {
        id: 4,
        nombre: 'Producto4',
        descripcion: 'Descripción del producto',
        precio: 4,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoria: 'Pantalon',
    },
    {
        id: 5,
        nombre: 'Producto5',
        descripcion: 'Descripción del producto',
        precio: 5,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoria: 'Accesorio',
    },
    {
        id: 6,
        nombre: 'Producto6',
        descripcion: 'Descripción del producto',
        precio: 6,
        imagen: 'assets/product/AroundTheFur-sm.png',
        categoria: 'Buzo'
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

productos.forEach((producto) => {
  const card = d.createElement('article');
  card.classList.add('card', 'text-center');
  products.append(card);


  const imagen = d.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.classList.add('card-img-top');
  imagen.setAttribute('data-bs-toggle', 'modal');
  imagen.setAttribute('data-bs-target','#productModal');
  imagen.addEventListener('click', () => detalleProducto(producto));
  card.append(imagen);

  const categoria = d.createElement('p');
  categoria.textContent = producto.categoria;
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
  card.appendChild(precio);
  
  
  let addBtn = d.createElement('button');
  addBtn.classList.add('add');
  addBtn.dataset.id = producto.id;
  addBtn.dataset.val = producto.precio;
  addBtn.dataset.cat = producto.categoria;
  addBtn.innerHTML = 'Agregar al carrito';

  addBtn.addEventListener('click', () => agregarAlCarrito(producto));
  card.appendChild(addBtn);

});

let addBtns = d.querySelectorAll('.add');


/* Carrito componentes */
const listaCarrito = document.getElementById('lista-carrito');
let itemProducto = listaCarrito.children;

let cantidadGeneral = 0;
let cantidadesIndividuales = {};

/* Agregar item carrito */
 function agregarAlCarrito(producto) {

  const id = producto.id;
  const val = producto.precio;

  //Verificando si el producto ya está en el carrito
  const indiceId = carrito.productosIds.indexOf(id);
  if(indiceId !== -1) {
    // Sí existe, incrementar cantidad y no agregar nuevo item
    carrito.cantidades[indiceId]++;
    // Actualizar texto cantidad en carrito
    const cantidadElement = itemProducto[indiceId].querySelector('.cantidad-prod');
    cantidadElement.textContent = `Cantidad: ${carrito.cantidades[indiceId]}`;
  } else {
    // Sí no existe, agregar nuevo item al carrito
    carrito.productosIds.push(id);
    carrito.cantidades.push(1);

    // Incrementar contador en header
    carrito.total += val;
    actualizarContadorCarrito();

    // Crear item en carrito
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

    const nombreProducto = d.createTextNode(producto.nombre);
    const precioProcucto = d.createTextNode(` $${producto.precio}`);

    const spanPrecio = d.createElement('span');
    spanPrecio.appendChild(precioProcucto);

    const cantidadProducto = d.createElement('span');
    cantidadProducto.classList.add('cantidad-prod');
    cantidadProducto.textContent = `Cantidad: ${carrito.cantidades[carrito.productosIds.indexOf(producto.id)] || 0}`;

    tituloCar.appendChild(nombreProducto);
    tituloCar.appendChild(d.createElement('br'));
    tituloCar.appendChild(spanPrecio);
    tituloCar.appendChild(cantidadProducto);

    descripCar.appendChild(tituloCar);


    const delBtn = d.createElement('button');
    delBtn.classList.add('del');
    delBtn.dataset.id = producto.id;
    delBtn.dataset.val = producto.precio;
    delBtn.dataset.cat = producto.categoria;
    delBtn.innerHTML = 'x';
    listItem.appendChild(delBtn);
    
    
    delBtn.addEventListener('click', () => eliminarDelCarrito(listItem));
  }
  
  // Actualizar el total
  carrito.total += val;

  // Mostrar detalle del carrito
  mostrarCarrito();
}


let delBtns = d.querySelectorAll('.del');

function eliminarDelCarrito(item) {
  const id = parseInt(item.querySelector('.del').dataset.id);
  const val = parseInt(item.querySelector('.del').dataset.val);

  // Obtener el índice del producto en el carrito
  const indiceId = carrito.productosIds.indexOf(id);

  if (indiceId !== -1) {
      // Restar el precio acumulado total
      carrito.total -= carrito.cantidades[indiceId] * val;

      // Restablecer la cantidad del producto a cero
      carrito.cantidades[indiceId] = 0;

      // Eliminar el ID del producto del carrito
      carrito.productosIds.splice(indiceId, 1);

      // Actualizar el carrito
      listaCarrito.removeChild(item);
      mostrarCarrito();
  }
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

const contadorCarrito = d.getElementById('contadorCarrito');
// Actualizar contador en header
function actualizarContadorCarrito() {
  const cantidadTotal = carrito.cantidades.reduce((acum, n) => acum + n, 0);
  contadorCarrito.textContent = cantidadTotal.toString();
}

const mostrarCarrito = () => {
    // const productosElement = d.getElementById('productos-carrito');
    const cantidadesElement = d.getElementById('cantidades-carrito');
    const totalElement = d.getElementById('total-carrito')
    
    // Muestro el detalle del carrito:
    // productosElement.textContent = `Productos: ${carrito.productosIds.join(', ')}`;
    cantidadesElement.textContent = `Tenes ${carrito.cantidades.reduce((acum, n) => acum + n, 0)} productos en el carrito.`;
    totalElement.textContent = `$${carrito.total}`;
};

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

/* Modal */
function detalleProducto(producto) {
  const modalBody = d.getElementById('productoModalBody');

  while (modalBody.hasChildNodes()) {
    modalBody.removeChild(modalBody.firstChild);
  }

  const imagen = d.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  modalBody.appendChild(imagen);

  const titulo = d.createElement('h2');
  titulo.classList.add('modal-titulo');
  titulo.textContent = producto.nombre;
  modalBody.appendChild(titulo);

  const categoria = d.createElement('p');
  categoria.textContent = producto.categoria;
  categoria.classList.add('badge','bg-secondary');
  modalBody.appendChild(categoria);

  const descripcion = d.createElement('p');
  descripcion.textContent = producto.descripcion;
  modalBody.appendChild(descripcion);

  const precio = d.createElement('p');
  precio.textContent = `$${producto.precio}`;
  modalBody.appendChild(precio);
}

// Mostrar carrito inicial:
mostrarCarrito();

/* Categorias */
const categorias = d.querySelectorAll('.dropdown-item');

categorias.forEach((categoria) => {
  categoria.addEventListener('click', () => filtrarCat(categoria.dataset.cat));
})

function filtrarCat(categoriaSelect) {
  // Si la categoría seleccionada es "todo", mostrar todo
  const productosFiltrados = categoriaSelect === 'todo' ? productos : productos.filter(producto => producto.categoria === categoriaSelect);

  while (products.hasChildNodes()) {
    products.removeChild(products.firstChild);
  }

  productosFiltrados.forEach((producto) => {
    const card = d.createElement('article');
    card.classList.add('card', 'text-center');
    products.append(card);


    const imagen = d.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.classList.add('card-img-top');
    imagen.setAttribute('data-bs-toggle', 'modal');
    imagen.setAttribute('data-bs-target','#productModal');
    imagen.addEventListener('click', () => detalleProducto(producto));
    card.append(imagen);

    const categoria = d.createElement('p');
    categoria.textContent = producto.categoria;
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
    addBtn.dataset.cat = producto.categoria;
    addBtn.innerHTML = 'Agregar al carrito';

    addBtn.addEventListener('click', () => agregarAlCarrito(producto));
    card.appendChild(addBtn);
  })
}