import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{
  cartItemsForByListDetailsOverall: CartItem[] = []
  totalPriceOverallBeforePayment: number = 0;
  totalQuantityOverallBeforePayment: number = 0
  
  

  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.listCartDetails()
  }
  
  listCartDetails(){
    //get a handle to the cart items
    this.cartItemsForByListDetailsOverall = this.cartService.cartItems
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPriceOverallBeforePayment = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantityOverallBeforePayment = data
    )

    this.cartService.computeCartTotals()
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCartItemList(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(item: CartItem) {
    this.cartService.remove(item)
  }
}
