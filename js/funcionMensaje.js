function traerMensajes(){
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Message/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta4(respuesta);
            }
        }
    );
}

function guardarMensajes(){
    let var2 = {
        messageText:$("#Mmessage").val(),
        client:{idClient:$("#select-client").val()},
        farm:{id:$("#select-farm").val()}       
        };
        console.log(var2);
      
    $.ajax(
            {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),   
            url:"http://144.22.57.189:8080/api/Message/save",

            success:function(response) {
                console.log(response);
                $("#Mmessage").val("");
                $("#Mclient").val("");
                $("#Mfarm").val("");     
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerMensajes()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerMensajes()
                console.log(errorThrown);
                alert("No se guardo correctamente");
            }
        }
    );
}

function actualizarMensajes(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#Mmessage").val(),
        client:{idClient:$("#select-client").val()},
        farm:{id:$("#select-farm").val()}       
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#Mmessage").val("");
                $("#Mclient").val("");
                $("#Mfarm").val("");    
                traerMensajes();
                alert("se ha Actualizado correctamente la categoria")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerMensajes();
                alert("No se guardo correctamente");
            }
        }
    );
}


function borrarMensajes(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Message/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#resultado").empty();
                traerMensajes();
                alert("Se ha Eliminado.")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerMensajes();
                alert("No se guardo correctamente");
            }
        }
    );
}

function pintarRespuesta4(respuesta){

    let myTable="<table  class='table' > <thead class='thead-dark'> <tr><th>Message text</th><th>Client</th><th>Farm</th><th>Update</th><th>Delete</th></tr> </thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr class='thead-light table-bordered'>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].farm.name+"</td>";
        myTable+="<td> <button class='btn btn-outline-secondary' onclick=' actualizarMensajes("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button class='btn btn-outline-secondary' onclick='borrarMensajes("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#mensaje").html(myTable);
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


