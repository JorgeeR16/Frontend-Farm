function traerCategorias() {
    $.ajax(
        {
            url: "http://144.22.57.189:8080/api/Category/all",
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                pintarRespuesta1(respuesta);
            }
        }
    );
}

function guardarCategorias() {
    let var2 = {
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };
    console.log("se esta ejecutando");
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url: "http://144.22.57.189:8080/api/Category/save",

            success: function (respuesta) {

                $("#Cname").val("");
                $("#Cdescription").val("");
                traerCategorias();
                alert("se ha Actualizado correctamente la categoria");
                console.log("se guardo");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                traerCategorias()
                alert("No se guardo correctamente");
            }
        }
    );
}

function actualizarCategorias(idElemento) {
    let myData = {
        id: idElemento,
        name: $("#Cname").val(),
        description: $("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax(
        {
            url: "http://144.22.57.189:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",

            success: function (respuesta) {

                $("#Cname").val("");
                $("#Cdescription").val("");
                traerCategorias();
                alert("se ha Actualizado correctamente la categoria")

            },
            error: function (jqXHR, textStatus, errorThrown) {
                traerCategorias()
                alert("No se guardo correctamente");
            }
        }
    );
}

function borrarCategorias(idElemento) {
    let myData = {
        id: idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax(
        {
            url: "http://144.22.57.189:8080/api/Category/" + idElemento,
            type: "DELETE",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",

            success: function (respuesta) {

                traerCategorias();
                alert("Se ha Eliminado.")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                traerCategorias();
                alert("No se guardo correctamente");
            }
        }
    );
}

function pintarRespuesta1(respuesta) {
    let myTable = "<table  class='table '> <thead class='thead-dark'> <tr><th>Name</th><th>Description</th><th>Update</th><th>Delete</th></tr> </thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr class='thead-light table-bordered'>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td> <button class='btn btn-outline-secondary' onclick='actualizarCategorias(" + respuesta[i].id + ")'>Actualizar</button>";
        myTable += "<td> <button class='btn btn-outline-secondary' onclick='borrarCategorias(" + respuesta[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#categoria").html(myTable);
}

