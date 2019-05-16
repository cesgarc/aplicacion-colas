

//Comando para establecer la conexión

var socket = io();
var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});


$('button').on('click', function () {
    console.log('Click en Botom');
    // Enviar Solicitud de Nuevo Ticket
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        console.log('respuesta server: ', siguienteTicket);
        label.text(siguienteTicket);
    });
});
