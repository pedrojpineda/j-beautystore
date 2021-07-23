let carrito = [];
let subtotal = 0;
const iva = 0.19;
let ivaCompra = 0;
let gastosEnvio = 10000;
let totalCompra = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        subtotal = Number(localStorage.getItem('subtotal'));
        if (document.getElementById('tabla-carrito')) {
            imprimirTablaCarrito();
        } else {
            mostrarCarrito();
        }
        console.log(localStorage);
        console.log(carrito);
    }
});

function a() {
    carrito = [];
    localStorage.clear();
}

function agregarCarrito(producto) {
    const existe = carrito.some(item => producto.id === item.id);
    if (!existe) {
        carrito.push(producto);
        producto.cantidad = 1;
        producto.precioFinal = producto.precio - ((producto.precio * producto.descuento) / 100);
        producto.subtotalProducto = producto.precioFinal * producto.cantidad;
        subtotal += producto.precioFinal;
        document.getElementById("subtotal").innerText = subtotal;
        guardarCarritoStorage();
        console.log(localStorage);
        console.log(carrito);
        productoEnCarrito(producto);
        botonesCantidad(producto);
    } else {
        let indexProducto = carrito.findIndex(item => producto.id === item.id);
        console.log(indexProducto);
        carrito[indexProducto].cantidad++
        document.getElementById(`cantidad-${producto.id}`).value = carrito[indexProducto].cantidad;
        carrito[indexProducto].subtotalProducto = carrito[indexProducto].precioFinal * carrito[indexProducto].cantidad;
        subtotal += carrito[indexProducto].precioFinal;
        document.getElementById("subtotal").innerText = subtotal;
        guardarCarritoStorage();
        console.log(localStorage);
        console.log(carrito);
        let botonMenos = document.getElementById(`boton-menos-${producto.id}`)
        if (carrito[indexProducto].cantidad > 1) {
            botonMenos.removeAttribute("disabled");
        } else {
            botonMenos.setAttribute("disabled", "");
        }
    }
}

function productoEnCarrito(producto) {
    let productoCarrito = document.createElement('article');
    productoCarrito.innerHTML = `
        <div class="row">
            <div class="col-lg-4 col-md-4">
                <a href="../categorias/belleza-cuidado-piel/crema-nutritiva-plus-50.html">
                    <img class="img-fluid" src="../imagenes/${producto.categoria}/${producto.foto}" alt="${producto.nombre}" title="${producto.nombre}">
                </a>    
            </div>
            <div class="col-lg-8 col-md-8">
                <h3>
                    <a href="../categorias/belleza-cuidado-piel/crema-nutritiva-plus-50.html">${producto.nombre}</a>
                </h3>
                <span class="precio">$ ${producto.precioFinal} (Oferta)</span>
                <span class="tachado">$ ${producto.precio} (Normal)</span>
                <div class="cantidad">
                    <button type="button" class="boton" id="boton-mas-${producto.id}"><i class="fas fa-plus"></i></button>
                    <input type="number" class="form-control d-inline" id="cantidad-${producto.id}" aria-label="Cantidad" value="${producto.cantidad}" disabled>
                    <button type="button" class="boton" id="boton-menos-${producto.id}"><i class="fas fa-minus"></i></button>
                </div>
            </div>
        </div>`;
    document.getElementById('modal-body').appendChild(productoCarrito);
}

function botonesCantidad(producto) {
    let botonMas = document.getElementById(`boton-mas-${producto.id}`);
    botonMas.addEventListener("click", clickBotonMas);
    let botonMenos = document.getElementById(`boton-menos-${producto.id}`)
    botonMenos.addEventListener("click", clickBotonMenos);
    let indexProducto = carrito.findIndex(item => producto.id === item.id);
    let cantidadValue = carrito[indexProducto].cantidad;
    
    if (cantidadValue > 1) {
        botonMenos.removeAttribute("disabled");
    } else {
        botonMenos.setAttribute("disabled", "");
    }

    function clickBotonMas() {        
        carrito[indexProducto].cantidad++;
        document.getElementById(`cantidad-${producto.id}`).value = carrito[indexProducto].cantidad;
        if (carrito[indexProducto].cantidad > 1) {
            botonMenos.removeAttribute("disabled");
        } else {
            botonMenos.setAttribute("disabled", "");
        }
        console.log(carrito[indexProducto].cantidad);
        carrito[indexProducto].subtotalProducto = carrito[indexProducto].precioFinal * carrito[indexProducto].cantidad;
        subtotal += carrito[indexProducto].precioFinal;
        document.getElementById("subtotal").innerHTML = "$ " + subtotal;

        if (document.getElementById("iva")) {
            ivaCompra = parseInt(subtotal * iva);
            document.getElementById("iva").innerHTML = "$ " + ivaCompra;
            totalCompra = subtotal + ivaCompra + gastosEnvio;
            document.getElementById("total-compra").innerHTML = "$ " + totalCompra;
        }

        guardarCarritoStorage(producto);
        console.log(localStorage);
        console.log(carrito);        
    }

    function clickBotonMenos() {        
        carrito[indexProducto].cantidad--;
        document.getElementById(`cantidad-${producto.id}`).value = carrito[indexProducto].cantidad;
        if (carrito[indexProducto].cantidad > 1) {
            botonMenos.removeAttribute("disabled");
        } else {
            botonMenos.setAttribute("disabled", "");
        }
        console.log(carrito[indexProducto].cantidad);
        carrito[indexProducto].subtotalProducto = carrito[indexProducto].precioFinal * carrito[indexProducto].cantidad;
        subtotal -= carrito[indexProducto].precioFinal;
        document.getElementById("subtotal").innerHTML = "$ " + subtotal;

        if (document.getElementById("iva")) {
            ivaCompra = parseInt(subtotal * iva);
            document.getElementById("iva").innerHTML = "$ " + ivaCompra;
            totalCompra = subtotal + ivaCompra + gastosEnvio;
            document.getElementById("total-compra").innerHTML = "$ " + totalCompra;
        }

        guardarCarritoStorage(producto);
        console.log(localStorage);
        console.log(carrito);        
    }

}

function mostrarCarrito() {
    carrito.forEach(producto => {
        productoEnCarrito(producto);
        botonesCantidad(producto);
    })
}

function imprimirTablaCarrito() {
    carrito.forEach(producto => {
        let productoCarrito = document.createElement('tr');
        productoCarrito.innerHTML = `
        <td>
            <img class="img-fluid" src="imagenes/${producto.categoria}/${producto.foto}" alt="${producto.nombre}" title="${producto.nombre}">
        </td>
        <td class="producto-carrito">
            <h2 class="h3">
                <a href="../categorias/belleza-cuidado-piel/crema-nutritiva-plus-50.html">${producto.nombre}</a>
            </h2>
        </td>
        <td>
            <div class="cantidad">
                <button type="button" class="boton" id="boton-mas-${producto.id}"><i class="fas fa-plus"></i></button>
                <input type="number" class="form-control d-inline" id="cantidad-${producto.id}" aria-label="Cantidad" value="${producto.cantidad}" disabled>
                <button type="button" class="boton" id="boton-menos-${producto.id}"><i class="fas fa-minus"></i></button>
            </div>
        </td>
        <td>${producto.precioFinal}</td>`;
        document.getElementById('tabla-carrito').appendChild(productoCarrito);

        botonesCantidad(producto);
    })
    let subtotalAgregado = document.createElement('tr');
    subtotalAgregado.innerHTML = `
            <td></td>
            <td class="producto-carrito"></td>
            <td>
                <h3>Subtotal</h3>
            </td>
            <td id="subtotal">$ ${subtotal}</td>`
    document.getElementById('tabla-carrito').appendChild(subtotalAgregado);

    ivaCompra = parseInt(subtotal * iva);
    let ivaAgregado = document.createElement('tr');
    ivaAgregado.innerHTML = `
        <td></td>
        <td class="producto-carrito"></td>
        <td>
            <h3>IVA</h3>
        </td>
        <td id="iva">$ ${ivaCompra}</td>`
    document.querySelector('.table').appendChild(ivaAgregado);

    let envioAgregado = document.createElement('tr');
    envioAgregado.innerHTML = `
        <td></td>
        <td class="producto-carrito"></td>
        <td>
            <h3>Gastos de envío</h3>
        </td>
        <td id="gastos-envio">$ ${gastosEnvio}</td>`
    document.querySelector('.table').appendChild(envioAgregado);

    totalCompra = subtotal + ivaCompra + gastosEnvio;
    let totalAgregado = document.createElement('tr');
    totalAgregado.innerHTML = `
        <td></td>
        <td class="producto-carrito"></td>
        <td>
            <h3>TOTAL</h3>
        </td>
        <td id="total-compra">$ ${totalCompra}</td>`
    document.querySelector('.table').appendChild(totalAgregado);
}

function guardarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('subtotal', subtotal);
}