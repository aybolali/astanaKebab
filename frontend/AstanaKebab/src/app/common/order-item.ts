import { CartItem } from "./cart-item";

export class OrderItem {
    
    public imageUrl!:string
    public unitPrice!:number
    public quantity!:number
    public productId!:string
    

    constructor(theCartItem:CartItem){
        this.productId = theCartItem.id
        this.imageUrl = theCartItem.imageUrl
        this.unitPrice = theCartItem.unitPrice
        this.quantity = theCartItem.quantity
    }
}
