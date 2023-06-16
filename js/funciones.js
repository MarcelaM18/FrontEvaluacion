const url = 'http://localhost:8086/api/hurto';

const listarDatos = async() => {
    let respuesta = '';
    let body = document.getElementById('contenido');
    
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json())
    .then(function(data) {
        let listahurtos = data.hurtos;
        
        listahurtos.forEach(function(hurto) {
            respuesta += `<tr><td>${hurto.direccion}</td>`+
            `<td>${hurto.latitud}</td>`+
            `<td>${hurto.longitud}</td>`+
            `<td>${hurto.descripcion}</td>`+
            `<td>${hurto.fecha}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger"
             href="#modal1" onclick='editar(${JSON.stringify(hurto)})'
              >Editar</a> <a class="waves-effect waves-light btn modal-danger 
              deep-orange darken-4" href='#' onclick='eliminar("${hurto._id}")'
              >Eliminar</a></td>`+
            `</tr>`;
        });
        
        body.innerHTML = respuesta;
    });
};

const registrar = async() => {
    let _direccion = document.getElementById('direccion').value;
    let _latitud = document.getElementById('latitud').value;
    let _longitud = document.getElementById('longitud').value;
    let _descripcion = document.getElementById('descripcion').value;
  

    let hurto = {
        direccion: _direccion,
        latitud: _latitud,
        longitud: _longitud,
        descripcion: _descripcion,
        
    };
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(hurto),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then((resp) => resp.json())
      .then(json => {
        if (json.msg) {
          Swal.fire(
            json.msg,
            '',
            'success'
          );
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
    const editar = (hurto) => {
        document.getElementById('direccion').value = '';
        document.getElementById('latitud').value = '';
        document.getElementById('longitud').value = '';
        document.getElementById('descripcion').value = '';
    
        document.getElementById('direccion').value = hurto.direccion;
        document.getElementById('latitud').value = hurto.latitud;
        document.getElementById('longitud').value = hurto.longitud;
        document.getElementById('descripcion').value = hurto.descripcion;
    };
    
    const actualizar = async() => {
        let _direccion = document.getElementById('direccion').value;
        let _latitud = document.getElementById('latitud').value;
        let _longitud = document.getElementById('longitud').value;
        let _descripcion = document.getElementById('descripcion').value;
    
        let hurto = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
        };
    
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(hurto),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json => {
            alert(json.msg);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    };
    

const eliminar = (id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        let hurto = {
            _id: id
        };
        
        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(hurto),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then(json => {
            alert(json.msg);
        });
    }
};

if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar').addEventListener('click', registrar);
}

if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}
