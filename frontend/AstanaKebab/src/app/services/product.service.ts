import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService{
  getProductById(productId: number):Observable<Product>{
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  private baseUrl = environment.astaanaKebabApiUrl + '/products'; //link to Spring Boot REST API backend service

  private categoryUrl = environment.astaanaKebabApiUrl + '/product-category';
  constructor(private httpClient:HttpClient) { }

  getProductList(theCategoryId:number): Observable<Product[]>{ //observable - for processing data
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    
    return this.getProducts(searchUrl);

  }

  getProductListPaginate(thePage:number, thePageSize:number, theCategoryId:number
  ): Observable<GetResponseProducts>{ //observable - for processing data
    //need to build url based on id,page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+
     `&page=${thePage}&size=${thePageSize}`;
    
    console.log(`Getting products from -  ${searchUrl}`)
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword:string):Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
  }
  searchProductsPaginate(thePage:number, thePageSize:number, theKeyword:string
  ): Observable<GetResponseProducts>{ //observable - for processing data
    //need to build url based on id,page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${theKeyword}`+
     `&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponseCategory{ //unwrap data from json
  _embedded: {
    productCategory:ProductCategory[] 
  }
}

interface GetResponseProducts{ //unwrap data from json
  _embedded: {
    products:Product[] 
  }
  page: {
    size:number,
    totalElements:number,
    totalPage:number,
    number:number
  }
}