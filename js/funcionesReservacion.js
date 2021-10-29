function traerReservaciones(){
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Reservation/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta5(respuesta);
            }
        }
    );
}

function guardarReservaciones(){
    let var2 = {
        startDate:$("#Rstartdate").val(),
        devolutionDate:$("#Rdevolutiondate").val(),
        client:{idClient:$("#Rclient").val()},
        farm:{id:$("#Rfarm").val()}       
        };

    $.ajax(
            {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),   
            url:"http://144.22.57.189:8080/api/Reservation/save",

            success:function(response) {
                console.log(response);
                $("#Rstartdate").val("");
                $("#Rdevolutiondate").val("");
                $("#Rclient").val("");
                $("#Rfarm").val(""); 
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerReservaciones()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerReservaciones()
                console.log(errorThrown);
                alert("No se guardo correctamente");
            }
        }
    );
}

function actualizarReservaciones(idElemento1){
    let myData={
        idReservation:idElemento1,
        startDate:$("#Rstartdate").val(),
        devolutionDate:$("#Rdevolutiondate").val(),
        client:{idClient:$("#Rclient").val()},
        farm:{id:$("#Rfarm").val()}       
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#Rstartdate").val("");
                $("#Rdevolutiondate").val("");
                $("#Rclient").val("");
                $("#Rfarm").val("");   
                traerReservaciones();
                alert("se ha Actualizado correctamente la categoria")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerReservaciones();
                alert("No se guardo correctamente");
            }
        }
    );
}


function borrarReservaciones(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Reservation/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#resultado").empty();
                traerReservaciones();
                alert("Se ha Eliminado.")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerReservaciones();
                alert("No se guardo correctamente");
            }
        }
    );
}

function pintarRespuesta5(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].farm.name+"</td>";
        myTable+="<td> <button onclick=' actualizarReservaciones("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReservaciones("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#reservacion").html(myTable);
}