import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { ShopValidators } from '../../validators/shop-validators';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { Address } from '../../common/address';
import { environment } from '../../../environments/environment';
import { PaymentInfo } from '../../common/payment-info';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!:FormGroup 

  totalQuantity:number = 0
  totalPrice:number = 0

  isDisabled = false //for getting only one transaction - avoiding from multiple transactions after extra clicks in one time

  creditCardMonths: number[] = []
  creditCardYears: number[] = []

  countries : Country[] = []

  shippingAddressStates : State[] = []
  billingAddressStates : State[] = []

  storage: Storage = sessionStorage

  stripeApi = Stripe(environment.stripePublishableKey)

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any;

  constructor(private formBuilder:FormBuilder,
    private shopFormService:ShopFormService,
    private cartService:CartService,
    private checkoutService:CheckoutService,
    private router: Router
){}
    
  ngOnInit(): void {

    this.setupStripePaymentForm()

    this.reviewCartDetails()

    //read the user's email address from browser 
    const theEmail = JSON.stringify(this.storage.getItem('userEmail'))


    this.checkoutFormGroup = this.formBuilder.group({ //build a form by types
      customer : this.formBuilder.group({ //like key name of customer form                                                                              значит для параметров упоминая только функцию оно будет отбирать то что им понадобиться для проверки - такова закон для typescript - вы передаёте ссылку на функцию, а не вызываете её
        firstName: /*[''] it was just initial form | now for validation there -> */ new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),//Typescript is a superset of Javascript, which can store functions as variables
        lastName: /*['']*/ new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        email: new FormControl(theEmail, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), ShopValidators.notOnlyWhitespace])
      }),
      shippingAddress : this.formBuilder.group({
        street: new FormControl('',  //initial start typing field
          [Validators.required, 
           Validators.minLength(2), 
           ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),    
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      }),
      billingAddress : this.formBuilder.group({
        street: new FormControl('',  //initial start typing field
          [Validators.required, 
           Validators.minLength(2), 
           ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),    
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
      }),
      creditCard : this.formBuilder.group({
        /*
        cardType: new FormControl('', [Validators.required, ShopValidators.notOnlyWhitespace]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}'), ShopValidators.notOnlyWhitespace]),//{16} means field must be 16 digits number
        security: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}'), ShopValidators.notOnlyWhitespace]),
        expirationMonth: [''],
        expirationYear: ['']
        */
      })
    }
   )

   /*
    const startMonth :number = new Date().getMonth() + 1
    console.log("current month: " + startMonth)

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retreived card months: " + JSON.stringify(data))
        this.creditCardMonths = data
      }
    )

    const startYear: number = new Date().getFullYear()
    console.log("current year: " + startYear)

    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved card years: " + JSON.stringify(data))
        this.creditCardYears = data
      }
    )

    */
    //populate countries
    this.shopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data))
        this.countries=data
      }
    )

  }

  setupStripePaymentForm() {
    var elements = this.stripeApi.elements()

    this.cardElement = elements.create('card', {hidePostalCode : true})

    //add an instance of card UI component into the 'card-element' div in HTML
    this.cardElement.mount('#card-element')

    this.cardElement.on('change', (event:any) => {
      this.displayError = document.getElementById('card-errors')

      if(event.complete){
        this.displayError.textContent=""
      } else if (event.error){
        this.displayError.textContent = event.error.message
      }
    })
  }
  
  reviewCartDetails() {

    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(//next
      dataOfTotalQuantityFromCartService => 
        {this.totalQuantity=dataOfTotalQuantityFromCartService}
    )

    //subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      dataOfTotalPriceFromCartService => 
        {this.totalPrice=dataOfTotalPriceFromCartService}
    )
  }

  onSubmit(){
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched(); //all touched properties will be true no matter if the user touched the filling field or not
    }
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')?.value.email);
  
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);
  
    //set up order
    let order = new Order();
    order.totalPrice = this.totalPrice
    order.totalQuantity = this.totalQuantity

    //get cart items
    const cartItems = this.cartService.cartItems

    //create orderItems from cartItems (converting from cart items to order items)
    let orderItems:OrderItem[] = cartItems.map(temporarySingleCartItem => new OrderItem(temporarySingleCartItem))

    let purchase = new Purchase()

    //populate purchase for customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value

    //populate purchase for shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value
    const shippingAddressState:State = JSON.parse(JSON.stringify(purchase.shippingAddress.state)) //taking(converting) a data from json to purchase object (converitng deep copy from json to javascript object)
    const shippingAddressCountry:Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country))
    purchase.shippingAddress.state = shippingAddressState.name
    purchase.shippingAddress.country = shippingAddressCountry.name

    //populate purchase for billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value
    const billingAddressState:State = JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingAddressCountry:Country = JSON.parse(JSON.stringify(purchase.billingAddress.country))
    purchase.billingAddress.state = billingAddressState.name
    purchase.billingAddress.country = billingAddressCountry.name

    // populate purchase - order and orderItems
    purchase.order = order
    purchase.orderItems = orderItems

    //payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "PLN"
    this.paymentInfo.receiptEmail=purchase.customer.email

    console.log(`payment info amount: ${this.paymentInfo.amount}`)

    /*
    //call REST API via checkoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {//next : success / happy
        next: response => {
          alert(`Your Order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`)

          //reset fields (after success form - clean all for the new order)
          this.resetForm()
        },
        error: error => {
          alert(`There is an error: ${error.message}`)
        }
      }
    )
    */
   // if valid form then 
   // - create payment intent
   // - confirm card payment
   // - place order

    if(!this.checkoutFormGroup.invalid && this.displayError.textContent === ""){

      this.isDisabled = true 

     this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe( //spring boot api
      paymentIntentResponse => {
        this.stripeApi.confirmCardPayment(paymentIntentResponse.client_secret,  //send credit card data directly to stripe.com servers
          {
            payment_method : {
              card: this.cardElement,  //reference the stripe elements component: cardElement
              billing_details: {
                email: purchase.customer.email,
                name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                address: {
                  city: purchase.billingAddress.city,
                  country: this.billingAddressCountry?.value.code,
                  line1: purchase.billingAddress.street,
                  postal_code: purchase.billingAddress.zipCode,
                  state: purchase.billingAddress.state
                }
              }
            }
          }, { handleActions: false })
        .then((result: any) => {
          if(result.error) {
            alert(`There was an error: ${result.error.message}`)
            this.isDisabled = false
          } else {
            //rest api
            this.checkoutService.placeOrder(purchase).subscribe({
              next: (response: any) => {
                alert(`Your Order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`)
                //reset fields (after success form - clean all for the new order)
                this.resetForm()
                this.isDisabled = false
              },
              error: (error:any) => {
                alert(`There is an error: ${error.message}`)
                this.isDisabled = false
              }          
            })
          }
        })     
      }
     )
    } else {
      this.checkoutFormGroup.markAllAsTouched()
      alert("Please fill all the fields correctly")
      return
    }
  }
  resetForm() {
    //reset the form data 
    this.cartService.cartItems = []
    this.cartService.totalPrice.next(0) //sending out a value 0 to all subscribers 
    this.cartService.totalQuantity.next(0) 
    this.cartService.persistCartItems() //reset the cart items in local storage

    //reset the form 
    this.checkoutFormGroup.reset()

    //sending back to main page
    this.router.navigateByUrl("/products")

  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName')} //will go as a variable in component html part like just - firstName
  get lastName(){return this.checkoutFormGroup.get('customer.lastName')}
  get Email(){return this.checkoutFormGroup.get('customer.email')}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')}
  get billpingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state')}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode')}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.security')}



  copyShippingToBilling(event:Event) {
    if((event.target as HTMLInputElement)?.checked){ //When the checkbox is checked (filled), it means its value is true, and when it's unchecked, its value is false. 
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
      this.billingAddressStates = this.shippingAddressStates
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset()
      this.billingAddressStates = []
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')

    const currentYear : number = new Date().getFullYear()
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear)

    let startMonth:number

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1
    } else {
      startMonth = 1
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit credit card months respectively by year" + JSON.stringify(data))
        this.creditCardMonths = data
      }
    )
  }
  getStates(formGroupName:string){
    const formGroup = this.checkoutFormGroup.get(formGroupName)

    const countryCode = formGroup?.value.country.code
    const countryName = formGroup?.value.country.name
 
    console.log(`${formGroupName} country code: ${countryCode}`)
    console.log(`${formGroupName} country name: ${countryName}`)

    this.shopFormService.getStates(countryCode).subscribe(
      data => {

        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data
        } else {
          this.billingAddressStates = data
        }

        //for by default
        formGroup?.get('state')?.setValue(data[0])
      }

    )
  }
}
