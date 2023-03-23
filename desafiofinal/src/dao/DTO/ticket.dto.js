export default class TicketDTO{
    construct(ticket){
        this.code = ticket.code;
        this.amount = ticket.amount;
        this.purchaser = ticket.email;
        this.date = ticket.date;
    }
}