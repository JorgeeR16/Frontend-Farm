function traerFincas(){
    $.ajax(
            {
            url:"http://129.151.106.144:8080/api/Farm/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta);
            }
        }
    );
}

function guardarFincas(){
    let var2 = {
        address:$("#Faddress").val(),
        extension:$("#Fextension").val(),
        category:{id:$("#Fcategory").val()},
        name:$("#Fname").val(),
        description:$("#Fdescription").val(),
        };
      
    $.ajax(
            {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),   
            url:"http://129.151.106.144:8080/api/Farm/save",

            success:function(response) {
                console.log(response);
                $("#Faddress").val("");
                $("#Fextension").val("");
                $("#Fcategory").val("");
                $("#Fname").val("");
                $("#Fdescription").val(""),
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerFincas()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerFincas()
                console.log(errorThrown);
                alert("No se guardo correctamente");
            }
        }
    );
}

function actualizarFincas(idElemento){
    let myData={
        id:idElemento,
        address:$("#Faddress").val(),
        extension:$("#Fextension").val(),
        category:{id:$("#Fcategory").val()},
        name:$("#Fname").val(),
        description:$("#Fdescription").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://129.151.106.144:8080/api/Farm/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#Faddress").val("");
                $("#Fextension").val("");
                $("#Fcategory").val("");
                $("#Fname").val("");
                $("#Fdescription").val(""),
                traerFincas();
                alert("se ha Actualizado correctamente la categoria")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerFincas();
                alert("No se guardo correctamente");
            }
        }
    );
}


function borrarFincas(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://129.151.106.144:8080/api/Farm/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#resultado").empty();
                traerFincas();
                alert("Se ha Eliminado.")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerFincas();
                alert("No se guardo correctamente");
            }
        }
    );
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].extension+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick=' actualizarFincas("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarFincas("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#finca").html(myTable);
}