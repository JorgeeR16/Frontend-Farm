function traerClientes(){
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Client/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta3(respuesta);
            }
        }
    );
}

function guardarClientes(){
    let var2 = {
        name:$("#Tname").val(),
        email:$("#Temail").val(),
        password:$("#Tpassword").val(),
        age:$("#Tage").val()
        };
      
    $.ajax(
            {
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),   
            url:"http://144.22.57.189:8080/api/Client/save",

            success:function(response) {
        
                $("#Tname").val("");
                $("#Temail").val("");
                $("#Tpassword").val("");
                $("#Tage").val("");
                traerClientes()
                alert("Se guardo correctamente");
                console.log("Se guardo correctamente");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerClientes()
                console.log(errorThrown);
                alert("No se guardo correctamente");
            }
        }
    );
}

function actualizarClientes(idElemento1){
    let myData={
        idClient:idElemento1,
        name:$("#Tname").val(),
        email:$("#Temail").val(),
        password:$("#Tpassword").val(),
        age:$("#Tage").val()
    };

    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Client/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#Tname").val("");
                $("#Temail").val("");
                $("#Tpassword").val("");
                $("#Tage").val("");
                traerClientes();
                alert("se ha Actualizado correctamente la categoria")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerClientes();
                alert("No se guardo correctamente");
            }
        }
    );
}


function borrarClientes(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url:"http://144.22.57.189:8080/api/Client/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#resultado").empty();
                traerClientes();
                alert("Se ha Eliminado.")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerClientes();
                alert("No se guardo correctamente");
            }
        }
    );
}

function pintarRespuesta3(respuesta){

    let myTable="<table  class='table' > <thead class='thead-dark'> <tr><th>Name</th><th>Email</th><th>Password</th><th>Age</th><th>Update</th><th>Delete</th></tr> </thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr class='thead-light table-bordered'>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='btn btn-outline-secondary' onclick=' actualizarClientes("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button class='btn btn-outline-secondary' onclick='borrarClientes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#cliente").html(myTable);
}