// BLOG
class Articulo {
    constructor(id, titulo, fecha, foto, resumen, autor, fotoAutor) {
        this.id = id;
        this.titulo = titulo;
        this.fecha = fecha;
        this.foto = foto;
        this.resumen = resumen;
        this.autor = autor;
        this.fotoAutor = fotoAutor;
    }
}

const blog = [];

blog.push(new Articulo(
    1,
    "Crema anti encrespamiento LOVE de Davines",
    "Julio 11 de 2021",
    "anti-encrespamiento.jpg",
    "Dicen que detrás de un cambio de look hay un cambio de vida y aunque suene a cliché, en mi caso está siendo totalmente cierto. La cosa es que después de cortarme el pelo toda mi rutina está cambiando.",
    "Clara González",
    "clara-gonzalez.png"
));

blog.push(new Articulo(
    2,
    "Diferentes tipos de Sérums que has de probar",
    "Julio 8 de 2021",
    "mejores-serums.jpg",
    "El eterno olvidado – después del tónico, claro -. El sérum es ese frasco caro y pequeño que te promete el mundo. ¿Pero qué demonios hace? ¿Por qué añadir OTRO producto más en tu rutina de cuidado de la piel?",
    "Camila Pineda",
    "camila-pineda.png"
));

blog.push(new Articulo(
    3,
    "Todo lo que debes saber sobre el protector solar",
    "Julio 3 de 2021",
    "protector-solar.jpg",
    "¿Qué factor debes utilizar? ¿qué tipos de filtros solares existen? o ¿qué protector solar necesitas? Si tienes una piel sensible hay que extremar la precaución y antes de tomar el sol ¡protege siempre la piel!",
    "Juan Álvarez",
    "juan-alvarez.png"
));

blog.push(new Articulo(
    4,
    "¿El aceite de coco es tan beneficioso como dicen?",
    "Junio 29 de 2021",
    "aceite-coco.jpg",
    "Parece que los alimentos de toda la vida no son suficientemente buenos, que ya estamos aburridos de ellos y debemos incorporar alguno nuevo. Ese alimento es el coco, concretamente el aceite de coco.",
    "Camila Pineda",
    "camila-pineda.png"
));
blog.push(new Articulo(
    5,
    "Uso de suplementos: ¿Cúando y cómo consumirlos?",
    "Junio 23 de 2021",
    "suplementos.jpg",
    "La información que encontramos sobre suplementos nutricionales para mejorar el rendimiento deportivo es infinita y muchas veces confusa. Hoy hemos hecho una revisión exhaustiva de la evidencia y poder aclarar un poco el tema.",
    "Juan Álvarez",
    "juan-alvarez.png"
));

$("#mas-articulos").hide();
$("#btn-anteriores").hide();

for (let articulo of blog) {
    if (articulo.id < 4) {
        $("#articulos-recientes").append(plantillaArticulo(articulo));
    }
   else {
        $("#mas-articulos").append(plantillaArticulo(articulo));
    }
}

function plantillaArticulo(articulo) {
    return `<div class="col-lg-4 col-md-6 col-sm-6">
            <article>
                <a href="blog/crema-anti-encrespamiento-love-de-davines.html">
                    <img class="img-fluid" src="imagenes/blog/${articulo.foto}"
                        alt="${articulo.titulo}"
                        title="${articulo.titulo}"></a>
                <span class="fecha">${articulo.fecha}</span>
                <h3><a href="blog/crema-anti-encrespamiento-love-de-davines.html">${articulo.titulo}</a>
                </h3>
                <p>${articulo.resumen}
                </p>
                <div class="flex">
                    <img class="img-autor" src="imagenes/autores/${articulo.fotoAutor}"
                        alt="${articulo.autor}" title="${articulo.autor}">
                    <span class="autor">${articulo.autor}</span>
                </div>
            </article>
        </div>`
}

$("#btn-mas-articulos").click(() => { 
    $("#articulos-recientes").slideUp(500, function() {
        $("#mas-articulos").slideDown(500);
        $("#btn-mas-articulos").hide();
        $("#btn-anteriores").show();
    });
});

$("#btn-anteriores").click(() => { 
    $("#mas-articulos").slideUp(500, function() { 
        $("#articulos-recientes").slideDown(500);
        $("#btn-anteriores").hide();
        $("#btn-mas-articulos").show();
    });
});
