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
        client:{idClient:$("#select-client").val()},
        farm:{id:$("#select-farm").val()}       
        };

    $.ajax(
            {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),   
            url:"http://144.22.57.189:8080/api/Reservation/save",

            success:function(response) {
                $("#Rstartdate").val("");
                $("#Rdevolutiondate").val("");
                $("#Rclient").val("");
                $("#Rfarm").val(""); 
                traerReservaciones()
                alert("Se guardo correctamente");
                console.log("Se guardo correctamente");
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
        client:{idClient:$("#select-client").val()},
        farm:{id:$("#select-farm").val()}       
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

    let myTable="<table  class='table' > <thead class='thead-dark'> <tr><th>Start date</th><th>Devolution date</th><th>Client</th><th>Farm</th><th>Update</th><th>Delete</th></tr> </thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr class='thead-light table-bordered'>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].farm.name+"</td>";
        myTable+="<td> <button class='btn btn-outline-secondary' onclick=' actualizarReservaciones("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button class='btn btn-outline-secondary' onclick='borrarReservaciones("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#reservacion").html(myTable);
}

function autoInicioCliente(){
    console.log("se esta ejecutando");
    $.ajax(
        {
        url:"http://144.22.57.189:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success : function(json){
            let $select = $("#select-client");
            $.each(json, function(id, name){
                $select.append("<option value="+ name.idClient +">" +name.name+"</option>");
                console.log("select "+name.idClient);
            });
        }
    })
}

function autoInicioFinca(){
    console.log("se esta ejecutando");
    $.ajax(
        {
        url:"http://144.22.57.189:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success : function(json){
            let $select = $("#select-farm");
            $.each(json, function(id, name){
                $select.append("<option value="+ name.id +">" +name.name+"</option>");
                console.log("select "+name.id);
            });
        }
    })
}