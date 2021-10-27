function traerCategorias(){
    $.ajax(
            {
            url:"http://129.151.106.144:8080/api/Category/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta1(respuesta);
            }
        }
    );
}

function guardarCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
    $.ajax(
            {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),   
            url:"http://129.151.106.144:8080/api/Category/save",

            success:function(response) {
                    console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerCategorias()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerCategorias()
                alert("No se guardo correctamente");
            }
        }
    );
}

function actualizarCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://129.151.106.144:8080/api/Category/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#resultado").empty();
                $("#id").val("");
                $("#Cname").val("");
                $("#Cdescription").val("");
                traerCategorias();
                alert("se ha Actualizado correctamente la categoria")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerCategorias()
                alert("No se guardo correctamente");
            }
        }
    );
}

function borrarCategorias(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://129.151.106.144:8080/api/Category/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#resultado").empty();
                traerCategorias();
                alert("Se ha Eliminado.")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerCategorias();
                alert("No se guardo correctamente");
            }
        }
    );
}

function pintarRespuesta1(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategorias("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#categoria").html(myTable);
}