export default class Event {
    eventName: string;
    eventDate: string;
    username: string;
    amount: number | null;
    
    constructor(eventName: string, eventDate: string, username: string, amount: number) {
      this.eventName = eventName;
      this.eventDate = eventDate;
      this.username = username;
      this.amount = amount;
    }
  }
  