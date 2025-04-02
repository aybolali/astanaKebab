import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []

  totalPrice: Subject<number> = new BehaviorSubject<number>(0)
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0) //BEHAVIORAL for getting the LAST EVENT(do not care for previous events - just getting the last event) to subscribe - 0 is initial value

  storage: Storage = sessionStorage //sessionStorage - reference to web browser's session storage - browser's memory - session storage -  f.e keep saving the values after some operation when the page refreshed - values will not lost - will keep staying due to session storage - no kogda browser tab zakroetsya - values will be lost
  //local storage is better that including this one it has a case when the page totally closed - data still stays(keep saving) after operations to browser's memory

  constructor() { 
    //read data from storage 
    let data = JSON.parse(this.storage.getItem('cartItems')!)

    if(data != null){
      this.cartItems = data

      //compute the total based on the data is read from storage
      this.computeCartTotals()
    }
  }

  addToCartItemList(theCartItem : CartItem){
    let alreadyExistsInCart:boolean=false;
     // @ts-ignore
    let existingCartItem: CartItem = undefined;


    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(currentCardItemElement => currentCardItemElement.id === theCartItem.id)!

      alreadyExistsInCart=(existingCartItem != undefined)
    }
      if(alreadyExistsInCart){
        existingCartItem.quantity++
      } else {
        this.cartItems.push(theCartItem)
      }

      this.computeCartTotals()

  }

  computeCartTotals() {
    let totalPriceValueOverall:number=0
    let totalQuantityOverall:number=0

    for(let currentItem of this.cartItems){
      totalPriceValueOverall+=currentItem.quantity * currentItem.unitPrice
      totalQuantityOverall+=currentItem.quantity
    }

    //publish the new values... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValueOverall)
    this.totalQuantity.next(totalQuantityOverall)

    this.logCartData(totalPriceValueOverall, totalQuantityOverall);

    //persist a data
    this.persistCartItems()
  }

  persistCartItems() {
    // Store the current cart items in Local Storage to keep them for later use - f.e keep saving the values after some operation when the page refreshed - values will not lost - will keep staying due to session storage
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems)); // Save cart items as a JSON string - key | value
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--

    if(theCartItem.quantity == 0){
      this.remove(theCartItem)
    } else {
      this.computeCartTotals()
    }
  }
  remove(theCartItem: CartItem) {
    //get index from array of item
    const itemIndex = this.cartItems.findIndex(currentCartItem => currentCartItem.id === theCartItem.id)

    //if found, remove the item from the array 
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1) //removing just for one type of element 

      this.computeCartTotals()
    }
  }
}
