const fs = require('fs');
const { getHeapStatistics } = require('v8');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

};

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    };

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo}`;
    };

    getUltimos4() {
        return this.ultimos4;
    };

    atenderTicket(escritorio) {
        console.log("que llego a escritorio", escritorio);
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        console.log("numero ticket", numeroTicket);

        //elimina el elemento
        this.tickets.shift(); //elimina primera posicion de arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket); //agrega ticket al inicio

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        console.log("ultimos 4")
        console.log(this.ultimos4);


        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    };

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    };
};

module.exports = {
    TicketControl
}