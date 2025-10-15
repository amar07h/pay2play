export interface Order {
id: string;
status: string;
invoice:number;
created_at: string;
fullname:string;
email:string;
whatsapp:string;
phone:string;
cart:CartItem[]
}