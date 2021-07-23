// PRODUCTOS
const urlJSON = "js/productos.json"

function ajaxProductos() {
    $.ajax({
        url: urlJSON,
        method: "GET",
        dataType: "JSON",
        success: function (result, status, jqXHR) {
            listaProductos(result);
        },
        error: function (jqXHR, status, error) {
            console.log(jqXHR);
            console.log(status);
            console.log(error);
        }
    });
}
ajaxProductos();

const categorias = ["belleza-cuidado-piel", "nutricion", "medicamentos"]

function listaProductos(productos) {
    for (let categoria of categorias) {
        categoria = productos.filter(producto => producto.categoria.includes(categoria));
        categoria.forEach(producto => {
            if (document.getElementById(producto.categoria)) {
                contenedor(producto);
                let botonCarrito = document.getElementById(`boton-carrito-${producto.id}`)
                botonCarrito.addEventListener("click", clickBoton);
                function clickBoton() {
                    agregarCarrito(producto);
                }
            }
        });
    }
}

function contenedor(producto) {
    let contenedorProducto = document.createElement('div');
    contenedorProducto.classList.add('col-lg-4', 'col-md-6', 'col-sm-6');
    contenedorProducto.innerHTML = `
        <article>
            <a href="../categorias/belleza-cuidado-piel/crema-nutritiva-plus-50.html">
                <img class="img-fluid" src="../imagenes/${producto.categoria}/${producto.foto}" alt="${producto.nombre}" title="${producto.nombre}">
            </a>
            <h2 class="h3">
                <a href="../categorias/belleza-cuidado-piel/crema-nutritiva-plus-50.html">${producto.nombre}</a>
            </h2>
            <p>${producto.descripcion}</p>
            <span class="precio">$ ${producto.precio - ((producto.precio * producto.descuento) / 100)} (Oferta)</span>
            <span class="tachado">$ ${producto.precio} (Normal)</span>
            <a data-bs-toggle="modal" data-bs-target="#modalCarrito" class="boton" id="boton-carrito-${producto.id}">
                <i class="fas fa-cart-plus"></i>Agregar al carrito
            </a>
        </article>`
    document.getElementById(producto.categoria).appendChild(contenedorProducto);
}

// BUSCADOR
$("#btn-buscar").click(() => {
    let inputBuscador = document.getElementById('buscar').value;
    if (inputBuscador != "") {
        $("#buscador").addClass("abierto");
    }
    $.getJSON(urlJSON, function (respuesta) {
        for (let categoria of categorias) {
            if (document.getElementById(categoria)) {
                document.getElementById(categoria).innerHTML = "";
            }
        }
        let productos = respuesta;
        let busqueda = productos.filter(producto => producto.nombre.trim().toLowerCase().includes(inputBuscador));
        busqueda.forEach(producto => {
            contenedor(producto);
            let botonCarrito = document.getElementById(`boton-carrito-${producto.id}`)
            botonCarrito.addEventListener("click", clickBoton);
            function clickBoton() {
                agregarCarrito(producto);
            }
        });
    });
});

$(".i-buscar").click(() => {
    if ($("#buscador").hasClass("abierto")) {
        document.getElementById('buscar').value = "";
        for (let categoria of categorias) {
            if (document.getElementById(categoria)) {
                document.getElementById(categoria).innerHTML = "";
            }
        }
        ajaxProductos();
        $("#buscador").removeClass("abierto");
    }
});

