

//Comando para establecer la conexión
var socket = io();
var label = $('small');

//Obteniendo los Parámetros por JS
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')){
    window.location = "index.html";
    throw new Error('El Escritorio es necesario.');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

$(`h1`).text('Escritorio ' + escritorio);

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio:escritorio}, function(resp) {
        if (resp === 'No hay Tickets'){
            alert('No hay más Tickets.');
            label.text(resp);
            return;
        }
        else{
            console.log('Ticket Atendido: ', resp);
            label.text('Ticket No ' + resp.numero);
        }
    });
});
