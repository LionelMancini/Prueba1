  /** * LISTA DE PRODUCTOS * **/
var productos = [
    {
        id: 1,
        nombre: "harina",
        precioUnitario: 35,
        cantidad: 9,
    },
    {
        id: 2,
        nombre: "pan",
        precioUnitario: 25,
        cantidad: 120
    },
    {
        id: 3,
        nombre: "papa",
        precioUnitario: 52,
        cantidad: 23,
    },
    {
        id: 4,
        nombre: "palta",
        precioUnitario: 55,
        cantidad: 2,
    },
    {
        id: 5,
        nombre: "fideos",
        precioUnitario: 85,
        cantidad: 58,
    },
    {
        id: 6,
        nombre: "aceite",
        precioUnitario: 350,
        cantidad: 85,
    },
    {
        id: 7,
        nombre: "sopa",
        precioUnitario: 86,
        cantidad: 12,
    },
    {
        id: 8,
        nombre: "mermelada",
        precioUnitario: 108,
        cantidad: 58,
}
];

 var productosCarrito = [];


/** CREAR ELEMENTO EN LA TABLA "GONDOLA" **/

function crearElementoTabla(productos){

    //NOMBRE
    var tdNombre = document.createElement ('td');
    var txtNombre = document.createTextNode (productos.nombre);
    tdNombre.appendChild(txtNombre);

    //PRECIO UNITARIO
    var tdPrecioUnitario = document.createElement ('td');
    var txtPrecioUnitario = document.createTextNode (productos.precioUnitario);
    tdPrecioUnitario.appendChild(txtPrecioUnitario);

    //CANTIDAD DISPONIBLE
    var tdCantidad = document.createElement ('td');
    var txtCantidad = document.createTextNode(productos.cantidad);
    tdCantidad.appendChild (txtCantidad);

    //CANTIDAD CARRITO
    var tdInput = document.createElement('td');
    var inputElement = document.createElement('input');
    tdInput.appendChild(inputElement);
    inputElement.setAttribute('type', 'numbr'); 
    inputElement.setAttribute('id', 'input'); 
    inputElement.setAttribute('placeholder', 'cantidad');

    //BOTON COMPRA
    var tdBoton = document.createElement('td');
    var btnBoton = document.createElement('button');
    var txtBoton = document.createTextNode('Comprar');
    btnBoton.setAttribute('class', 'btn btn-primary' );
    btnBoton.setAttribute('id', productos.id);
    btnBoton.appendChild(txtBoton);
    tdBoton.appendChild(btnBoton);
    tdBoton.addEventListener("click", agregarCarrito);

    //CREO EL TR
    var tr = document.createElement('tr');

    // COLOCO LOS TR DENTRO DE LOS TD
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecioUnitario);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdInput);
    tr.appendChild(tdBoton);
    
    //COLOCO EL TR DENTRO DE LA TABLA 1 A TRAVES DEL ID DEL TBODY
    var tbody = document.getElementById('tb1');
    tbody.appendChild(tr);

}

//RECORRO LA FUNCION
productos.forEach(item => {
    crearElementoTabla(item);
});

//AGREGAR CARRITO
function agregarCarrito(e){

    // INPUT
    var input = e.target.parentNode.previousSibling.firstChild;

    // VALOR DEL INPUT
    var CantidadCompra = input.value;
 
    //ID DEL PRODUCTO
    var idProducto= e.target.id;

    //SE BUSCA LA POSICION DEL PRODUCTO
    var index = productos.findIndex(item=> item.id==idProducto);

    //SE COPIA EL CONTENIDO DEL PRODUCTO
    var producto = productos[index];

    //PROPIEDADES DEL PRODUCTO [INDEX]
    var id = producto.id;
    var nombre = producto.nombre;
    var cantidad = producto.cantidad;
    var precio = producto.precioUnitario;
        
    //INFORMACION DEL PRODUCTO COMPRADO PARA AGREGAR A LA LISTA
    var productoFinal = {
        id: id,
        nombre: nombre,
        precioUnitario: precio,
        cantidad: CantidadCompra, 
    }

    // se verifica si el producto ya fue comprado o no.
    var VerifComprados = productosCarrito.findIndex(p => p.id == idProducto);
    if (VerifComprados != -1)
    {
        alert('Este producto ya fue comprado.');
        return;
    }

    // AGREGADO A LA LISTA CARRITO
    productosCarrito.push(productoFinal);
    
    //PARAMETROS

    //CANTIDAD MAYOR A 0 Y MAYOR O IGUAL A LA CANTIDAD
    if (CantidadCompra >= '1' && CantidadCompra <= cantidad) 
    {   
         
        alert ('El producto se agrego al carrito');

        crearTablacarrito(productoFinal);

    } 
    else
    {
        alert ('Ingrese un monto o cantidad valida!');
        
    }; 

};

//CREO ELEMENTO TABLA "CARRITO"
function crearTablacarrito(productoFinal){

    //NOMBRE
    var tdNombre = document.createElement('td');
    var txtNombre = document.createTextNode(productoFinal.nombre);
    tdNombre.appendChild(txtNombre);

    //CANTIDAD COMPRADA
    var tdCantidad = document.createElement('td');
    var txtCantidad = document.createTextNode(productoFinal.cantidad);
    tdCantidad.appendChild(txtCantidad);

    //PRECIO UNITARIO
    var tdPrecio = document.createElement('td');
    var txtPrecio = document.createTextNode(productoFinal.precioUnitario);
    tdPrecio.appendChild(txtPrecio);

    //SUBTOTAL
    var tdPrecioTotal = document.createElement('td');
    var txtPrecioTotal = document.createTextNode(productoFinal.precioUnitario * productoFinal.cantidad);
    tdPrecioTotal.appendChild(txtPrecioTotal);

    
    //BOTON BORRAR
    var tdBorrar = document.createElement('td');
    var btnBorrar = document.createElement('button');
    var txtBorrar = document.createTextNode('Borrar');
    btnBorrar.setAttribute('class', 'btn btn-danger')
    btnBorrar.appendChild(txtBorrar);
    tdBorrar.appendChild(btnBorrar);
    tdBorrar.addEventListener("click", borrarCarrito);

    //TR 
    var tr = document.createElement('tr');
    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdPrecioTotal);
    tr.appendChild(tdBorrar);

    var tbody = document.getElementById('tb2');
    tbody.appendChild(tr);
};

//BORRAR CARRITO
    function borrarCarrito(e){
    filaCarrito = e.target.parentNode.parentNode;
    filaCarrito.parentNode.removeChild(filaCarrito);


} 

function CompraTotal() {
    // TOTAL DE LA COMPRA
    var total = 0;
    productosCarrito.forEach(productos =>
    {
        total += productos.precioUnitario * productos.cantidad;
    });

     alert('El Total de su compra es de '+total+ '.');
    mensaje.innerHTML = "Total: " + formatMoney(total);
}
