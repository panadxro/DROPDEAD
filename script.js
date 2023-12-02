'use strict';

const d = document;
const productos = [
  { id: 1, nombre: 'Producto1', descripcion: 'Descripción del producto', precio: 1, imagen: 'assets/product/AroundTheFur-sm.png', categoria: 'Remera' },
  { id: 2, nombre: 'Producto2', descripcion: 'Descripción del producto', precio: 2, imagen: 'assets/product/AroundTheFur-sm.png', categoria: 'Buzo' },
  { id: 3, nombre: 'Producto3', descripcion: 'Descripción del producto', precio: 3, imagen: 'assets/product/AroundTheFur-sm.png', categoria: 'Campera' },
  { id: 4, nombre: 'Producto4', descripcion: 'Descripción del producto', precio: 4, imagen: 'assets/product/AroundTheFur-sm.png', categoria: 'Pantalon' },
  { id: 5, nombre: 'Producto5', descripcion: 'Descripción del producto', precio: 5, imagen: 'assets/product/AroundTheFur-sm.png', categoria: 'Accesorio' },
  { id: 6, nombre: 'Producto6', descripcion: 'Descripción del producto', precio: 6, imagen: 'assets/product/AroundTheFur-sm.png', categoria: 'Buzo' },
];

const info = d.querySelector('#info-carrito');
const filtros = d.querySelectorAll('#filtros a');
const products = d.querySelector('#productos');
const listaCarrito = d.getElementById('lista-carrito');
const itemProducto = listaCarrito.children;
const cantidadesElement = d.querySelectorAll('.cantidades-carrito');
const totalElement = d.getElementById('total-carrito');
const reset = d.querySelector('#reset');
const modalBody = d.getElementById('productoModalBody');

let carrito = { productosIds: [], cantidades: [], total: 0 };

productos.forEach(producto => {
  const card = d.createElement('article');
  card.classList.add('card', 'text-center');
  products.append(card);

  const imagen = d.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.classList.add('card-img-top');
  imagen.setAttribute('data-bs-toggle', 'modal');
  imagen.setAttribute('data-bs-target', '#productModal');
  imagen.addEventListener('click', () => detalleProducto(producto));
  card.append(imagen);

  const titulo = d.createElement('h3');
  titulo.textContent = producto.nombre;
  card.appendChild(titulo);

  const descripcion = d.createElement('p');
  descripcion.textContent = producto.descripcion;
  card.appendChild(descripcion);


  const precio = d.createElement('p');
  const precioSpan = d.createElement('span');
  precio.classList.add('price');
  precioSpan.textContent = producto.precio;
  precio.appendChild(d.createTextNode('$'));
  precio.appendChild(precioSpan);
  card.appendChild(precio);

  const addBtn = d.createElement('button');
  addBtn.classList.add('add');
  addBtn.dataset.id = producto.id;
  addBtn.dataset.val = producto.precio;
  addBtn.dataset.cat = producto.categoria;
  addBtn.innerHTML = 'Agregar al carrito';
  addBtn.addEventListener('click', () => agregarAlCarrito(producto));
  card.appendChild(addBtn);
});

reset.addEventListener('click', () => {
  carrito = { productosIds: [], cantidades: [], total: 0 };
  while (listaCarrito.hasChildNodes()) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
  mostrarCarrito();
});

function agregarAlCarrito(producto) {
  const id = producto.id;
  const val = producto.precio;
  const indiceId = carrito.productosIds.indexOf(id);

  if (indiceId !== -1) {
    carrito.cantidades[indiceId]++;
    carrito.total += val;
    const cantidadElement = itemProducto[indiceId].querySelector('.cantidad-prod');
    cantidadElement.textContent = `${carrito.cantidades[indiceId]}`;
  } else {
    carrito.productosIds.push(id);
    carrito.cantidades.push(1);

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
    cantidadProducto.textContent = `${carrito.cantidades[carrito.productosIds.indexOf(producto.id)] || 0}`;
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

    carrito.total += val;
  }

  mostrarCarrito();
}

function eliminarDelCarrito(item) {
  const id = parseInt(item.querySelector('.del').dataset.id);
  const val = parseInt(item.querySelector('.del').dataset.val);
  const indiceId = carrito.productosIds.indexOf(id);

  if (indiceId !== -1) {
    carrito.total -= carrito.cantidades[indiceId] * val;
    carrito.productosIds.splice(indiceId, 1);
    carrito.cantidades.splice(indiceId, 1);
    listaCarrito.removeChild(item);
    mostrarCarrito();
  }
}

for (let btn of d.querySelectorAll('.del')) {
  btn.addEventListener('click', (e) => {
    const item = e.target.closest('.item-producto');
    eliminarDelCarrito(item);
  });
}

const mostrarCarrito = () => {
  const total = carrito.cantidades.reduce((acum, cantidad, indice) => {
    const producto = productos.find(p => p.id === carrito.productosIds[indice]);
    return acum + (producto ? cantidad * producto.precio : 0);
  }, 0);

  cantidadesElement.forEach(element => {
    element.textContent = carrito.cantidades.reduce((acum, n) => acum + n, 0);
  });

  totalElement.textContent = `$${total}`;
};

function detalleProducto(producto) {
  while (modalBody.hasChildNodes()) {
    modalBody.removeChild(modalBody.firstChild);
  }

  const elements = [
    { tag: 'img', attributes: { src: producto.imagen, alt: producto.nombre } },
    { tag: 'h2', textContent: producto.nombre, classList: ['modal-titulo'] },
    { tag: 'p', textContent: producto.categoria, classList: ['badge', 'bg-secondary'] },
    { tag: 'p', textContent: producto.descripcion },
    { tag: 'p', textContent: `$${producto.precio}`, classList: ['price'] },
    { tag: 'button', classList: ['add'], dataset: { id: producto.id, val: producto.precio, cat: producto.categoria }, innerHTML: 'Agregar al carrito', eventListener: () => agregarAlCarrito(producto) }
  ];

  elements.forEach(element => {
    const el = d.createElement(element.tag);
    if (element.textContent) el.textContent = element.textContent;
    if (element.attributes) Object.entries(element.attributes).forEach(([key, value]) => el.setAttribute(key, value));
    if (element.classList) el.classList.add(...element.classList);
    if (element.dataset) Object.entries(element.dataset).forEach(([key, value]) => el.dataset[key] = value);
    if (element.innerHTML) el.innerHTML = element.innerHTML;
    if (element.eventListener) el.addEventListener('click', element.eventListener);
    modalBody.appendChild(el);
  });
}

const categorias = d.querySelectorAll('.dropdown-item');

categorias.forEach(categoria => {
  categoria.addEventListener('click', () => filtrarCat(categoria.dataset.cat));
});

function filtrarCat(categoriaSelect) {
  const productosFiltrados = categoriaSelect === 'todo' ? productos : productos.filter(producto => producto.categoria === categoriaSelect);

  while (products.hasChildNodes()) {
    products.removeChild(products.firstChild);
  }

  productosFiltrados.forEach(producto => {
    const card = d.createElement('article');
    card.classList.add('card', 'text-center');
    products.append(card);

    const imagen = d.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.classList.add('card-img-top');
    imagen.setAttribute('data-bs-toggle', 'modal');
    imagen.setAttribute('data-bs-target', '#productModal');
    imagen.addEventListener('click', () => detalleProducto(producto));
    card.append(imagen);

    const titulo = d.createElement('h3');
    titulo.textContent = producto.nombre;
    card.appendChild(titulo);
  
    const descripcion = d.createElement('p');
    descripcion.textContent = producto.descripcion;
    card.appendChild(descripcion);

    const precio = d.createElement('p');
    const precioSpan = d.createElement('span');
    precio.classList.add('price');
    precioSpan.textContent = producto.precio;
    precio.appendChild(d.createTextNode('$'));
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
}

mostrarCarrito();
