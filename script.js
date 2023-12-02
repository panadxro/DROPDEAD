'use strict';
/* PANADERO LUCAS DWT2AP TP2 - Ecommerce */
const d = document;
const productos = [
  { id: 1, nombre: '28 Days', descripcion: 'Ring', precio: 20, imagen: 'assets/product/28Days.png', categoria: 'Accesorio' },
  { id: 2, nombre: 'Angel Soup', descripcion: 'Blue Longsleeve', precio: 70, imagen: 'assets/product/AngelSoup.png', categoria: 'Remera' },
  { id: 3, nombre: 'Around The Fur', descripcion: 'Faux fur jacket', precio: 200, imagen: 'assets/product/AroundTheFur.png', categoria: 'Campera' },
  { id: 4, nombre: 'Blessings', descripcion: 'Longsleeve', precio: 70, imagen: 'assets/product/Blessing.png', categoria: 'Remera' },
  { id: 5, nombre: 'Glow Bottoms', descripcion: 'Black Sweatpants', precio: 120, imagen: 'assets/product/GlowBottoms.png', categoria: 'Pantalon' },
  { id: 6, nombre: 'Hollowed Soul', descripcion: 'Washed Black Hoodie', precio: 120, imagen: 'assets/product/HollowedSoul.png', categoria: 'Buzo' },
  { id: 7, nombre: "J'adore Hardcore", descripcion: '2 in 1 Jacket', precio: 200, imagen: 'assets/product/J_AdoreHardcore.png', categoria: 'Campera' },
  { id: 8, nombre: 'Lure', descripcion: 'Distressed Hoodie', precio: 120, imagen: 'assets/product/Lure.png', categoria: 'Buzo' },
  { id: 9, nombre: 'Makeover', descripcion: 'Washed Black T-Shirt', precio: 50, imagen: 'assets/product/Makeover.png', categoria: 'Remera' },
  { id: 10, nombre: 'Mala', descripcion: 'Wooden bead necklace', precio: 20, imagen: 'assets/product/Mala.png', categoria: 'Accesorio' },
  { id: 11, nombre: 'Max Pain', descripcion: 'Racer Jacket', precio: 250, imagen: 'assets/product/MaxPain.png', categoria: 'Campera' },
  { id: 12, nombre: "Rot 'N' Roll", descripcion: 'Washed Black T-Shirt', precio: 60, imagen: 'assets/product/RotNRoll.png', categoria: 'Remera' },
  { id: 13, nombre: 'Seek & Destroy', descripcion: 'Denim Jeans', precio: 120, imagen: 'assets/product/Seek_Destroy.png', categoria: 'Pantalon' },
  { id: 14, nombre: 'Sigil', descripcion: 'Earrings', precio: 20, imagen: 'assets/product/Sigil.png', categoria: 'Accesorio' },
  { id: 15, nombre: 'Spiritual', descripcion: 'Socks (Pack of 2)', precio: 20, imagen: 'assets/product/Spiritual.png', categoria: 'Accesorio' },
  { id: 16, nombre: 'Tamriel', descripcion: 'Broach', precio: 15, imagen: 'assets/product/Tamriel.png', categoria: 'Accesorio' },
  { id: 17, nombre: 'Violence', descripcion: 'Elasticated Shorts', precio: 60, imagen: 'assets/product/Violence.png', categoria: 'Pantalon' },
];

/* DOM */
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

/* Productos en interfaz */
productos.forEach(producto => {
  /* Crear y agregar elementos al DOM */
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

/* Vaciar carrito */
reset.addEventListener('click', () => {
  carrito = { productosIds: [], cantidades: [], total: 0 };
  while (listaCarrito.hasChildNodes()) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
  mostrarCarrito();
});

/* Agregar producto al carrito */
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

/* Eliminar producto del carrito */
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

/* Mostrar carrito en interfaz */
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

/* Detalles del producto */
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
/* Filtrar */
categorias.forEach(categoria => {
  categoria.addEventListener('click', () => filtrarCat(categoria.dataset.cat));
});
/* Filtrar productos por categoría */
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
/* Inicializar: Mostrar productos */
mostrarCarrito();
