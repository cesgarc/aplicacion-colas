const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) =>{
        let siguiente = ticketControl.siguiente();
        console.log(`El siguiente es el Ticket:${siguiente}`);
        callback(siguiente);
    });

    //Emitir un nuevo evento estado Actual {actual:ticketControl.getUltimoTicket();}
    client.emit('estadoActual', {actual:ticketControl.getUltimoTicket(), ultimos4:ticketControl.getUltimos4()});

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es Necesario.'
            });
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );
        callback(atenderTicket);

        //Actualizar Cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {actual:ticketControl.getUltimoTicket(), ultimos4:ticketControl.getUltimos4()});
    });

});