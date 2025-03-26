import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product!:Product;
  constructor(private route:ActivatedRoute,
    private productService:ProductService,
    private cartService:CartService
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>
      this.handleProductDetails()
    )
  }
  handleProductDetails(){
    const productId:number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductById(productId).subscribe( //to take these specific steps(preactions) to update the page accordingly
      data => {
        this.product = data;
      }
    )
  }
  addToCart(product2:Product) {
    console.log(`Adding to Cart: ${this.product.name}, ${this.product.unitPrice}`)
    const cartItemFromDetail = new CartItem(product2)
    this.cartService.addToCartItemList(cartItemFromDetail)
  }

}
