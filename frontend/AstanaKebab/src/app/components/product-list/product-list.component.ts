import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-tablecomponent.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products : Product[] = [];
  currentIdCategory:number = 1;
  currentCategoryName: string = "";
  searchMode:boolean=false;
  previousKeyword:string=""

  thePageNumber = 1;
  thePageSize = 4;
  theTotalElements = 0;
  previousCategoryId: number = 1;
  constructor(private productService : ProductService,
    private route:ActivatedRoute,
    private cartService : CartService
  ){}

  ngOnInit(): void { //initialize
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    } else{
      this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;

    //if we have different keyword than previous - then set pageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1;
    }

    this.previousKeyword=theKeyword;

    console.log(`keyword=${theKeyword},thePageNumber=${this.thePageNumber}`)

    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(this.processResult())
    
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the "id" param string. CONVERT string to a Number using the "+" symbol
      this.currentIdCategory = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }else{
      this.currentIdCategory = 1;
      this.currentCategoryName = 'Kebabs';
    }

    if(this.previousCategoryId != this.currentIdCategory){ //switching from category to other category
      this.thePageNumber = 1; //to top of page when after switching category type
    }

    this.previousCategoryId=this.currentIdCategory;

    console.log(`currentCategoryId=${this.currentIdCategory}, thePageNumber=${this.thePageNumber}`)
    this.productService.getProductListPaginate(
      this.thePageNumber-1, //to array form
      this.thePageSize, 
      this.currentIdCategory
    ).subscribe( //products for id respectively
      data => { //the same similiar to processResult()
        this.products=data._embedded.products;
        this.thePageNumber=data.page.number + 1;
        this.thePageSize=data.page.size;
        this.theTotalElements=data.page.totalElements;
      }
    )
  }
  updatePageSize(thePageSize:string){
    this.thePageSize=+thePageSize;
    this.thePageNumber=1;
    this.listProducts()
  }
  processResult(){
    return (data:any) => {
        this.products=data._embedded.products;
        this.thePageNumber=data.page.number + 1;
        this.thePageSize=data.page.size;
        this.theTotalElements=data.page.totalElements;
    }
  }
  addToCart(theProduct:Product){
    console.log(`Adding to cart : id: ${theProduct.id}, ${theProduct.name}, ${theProduct.unitPrice}`)

    const cartItem = new CartItem(theProduct)

    this.cartService.addToCartItemList(cartItem)
  }
}
