import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PayCustomer } from './payCustomer';
import { StripeCustomer } from './stripeCustomer';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Charge } from './charge';
import {
  ComponentFactoryResolver, ElementRef,
  Injector,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { timeInterval } from 'rxjs/operators';
import { Time, getLocaleTimeFormat } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})


export class PaymentComponent implements OnInit {
  companyId: any;
  
  @ViewChild('paymentComponent', { static: false, read: ViewContainerRef }) messageComponent;
 

  constructor(private service: PaymentService,private route:ActivatedRoute,private router:Router) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }  

  // handler:any = null;

  // ngOnInit() {
    // this.loadScript("../../../../../../assets/paymentjs/l10n.js");
  // }
 user:any;
  ngOnInit() {
  
}

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

//   loadStripe() {
     
//     if(!window.document.getElementById('stripe-script')) {
//       var s = window.document.createElement("script");
//       s.id = "stripe-script";
//       s.type = "text/javascript";
//       s.src = "https://checkout.stripe.com/checkout.js";
//       window.document.body.appendChild(s);
//     }
//   }

//   pay(amount) {    
 
//     var handler = (<any>window).StripeCheckout.configure({
//       key: 'pk_test_Y6hGxpDWx8izZPr0ZPzUUb6E005lHK1Fzn',
//       locale: 'auto',
//       token: function (token: any) {
//         // You can access the token ID with `token.id`.
//         // Get the token ID to your server-side code for use.
//         console.log(token)
//         alert('Token Created!!');
//       }
//     });
 
//     handler.open({
//       name: 'Demo Site',
//       description: '2 widgets',
//       amount: amount * 100
//     });
// }



// chargeCreditCard() {
//   let form = document.getElementsByTagName("form")[0];
//   (<any>window).Stripe.card.createToken({
//     number: form.cardNumber.value,
//     exp_month: form.expMonth.value,
//     exp_year: form.expYear.value,
//     cvc: form.cvc.value
//   }, (status: number, response: any) => {
//     if (status === 200) {
//       let token = response.id;
//       this.chargeCard(token);
//     } else {
//       console.log(response.error.message);
//     }
//   });
// }

// chargeCard(token: string) {
//   const headers = new Headers({'token': token, 'amount': 100});
//   this.http.post('http://localhost:8080/payment/charge', {}, {headers: headers})
//     .subscribe(resp => {
//       console.log(resp);
//     })
// }

  private custData:StripeCustomer = new StripeCustomer();
  private customer:PayCustomer= new PayCustomer();
  private customerDetail:any ; 
  private chargeObject:Charge = new Charge();
  // private order:Order = new Order();
  // private product:Product = new Product();
  private email:String;
  private name:String;
  private custStripeId:String;
  private amount:String;
  private cardId:String;
  private paymentStatus:String;
  private paymentSuccess:Boolean = false;
  private payment:Boolean = false;
  private balance_transaction:String;
  private receipt_url:String;
  public notOnPayment:Boolean=false;
  private amountEntered: number;
  private pricing:Boolean = true;
  private err:String;
  public now: Date = new Date();
  public haspaid:boolean= false;
  public timediff: number;
  public ms:number;
  public daysfrompayment:number;

  doPayment(amount: number){
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.email = this.user.emailId; 
      this.name = this.user['company'].companyName;
      this.companyId = this.user['company'].id;
      console.log(this.companyId);
      console.log(this.email,this.name,this.companyId);
    })
    this.service.getCustID(this.email).subscribe(data =>{
      this.customerDetail = data;
      console.log(this.customerDetail, "lets check");
      let string = this.customerDetail.timeStamp.date.year + "/" + this.customerDetail.timeStamp.date.month + "/" + this.customerDetail.timeStamp.date.day
      console.log(moment(moment.now()).diff(moment(string), "days"));
      
      if(moment(moment.now()).diff(moment(string), "days")>30)
      {
        this.pricing= false;
        this.payment= true;
        this.amountEntered = amount;    
      }
      else{
        this.daysfrompayment= moment(moment.now()).diff(moment(string), "days");
        this.pricing= false;
        this.payment= false;
        this.haspaid= true;
        console.log(moment());
        console.log("******");
        console.log(moment(this.customerDetail.timeStamp));
      }
    },(error)=>{
      console.log(error);
    })
    }

  addCard(number,exp_month,exp_year,cvc){

    this.user=JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    this.notOnPayment=false;
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.email = this.user.emailId; 
      this.name = this.user['company'].companyName;
      this.companyId = this.user['company'].id;
      console.log(this.companyId);
      console.log(this.email,this.name,this.companyId);
    })

    this.service.addStripeCust(this.name,this.email,this.companyId).subscribe(data => {this.custData = data;
      console.log(this.custData);
    this.customer.cusEmail=this.custData.email;
    this.customer.cusId=this.custData.id;
    this.custStripeId= this.custData.id;
    this.customer.cusName=this.custData.name;
    this.customer.amount= this.amountEntered.toString();
    console.log(this.customer);
    console.log(this.custStripeId)
    this.service.addCustToDatabase(this.customer).subscribe(data =>{console.log(data)
  

    console.log(number,exp_month,exp_year,cvc,this.amountEntered);
    this.amount=this.amountEntered.toString();
    this.service.getCustID(this.email).subscribe(data =>{
      this.customerDetail = data;
      // this.customerDetail = this.customer;
      this.custStripeId=this.customerDetail.cusId;
      // this.ms= moment(this.now,"DD/MM/YYYY HH:mm:ss").diff(moment(this.customerDetail.timeStamp,"DD/MM/YYYY HH:mm:ss"));
      // if(moment.duration(this.ms).asDays()>30)    
      // {
        console.log(this.custStripeId);
        console.log(this.custStripeId,number,exp_month,exp_year);
      this.service.addCardToStripe(this.custStripeId,number,exp_month,exp_year).subscribe(data=>{
        
        this.service.charge(this.custStripeId,this.amount).subscribe(data =>{
          this.chargeObject=data;
          this.paymentStatus=this.chargeObject.status;
          this.cardId=this.chargeObject.payment_method;
          this.balance_transaction=this.chargeObject.balance_transaction;
          this.receipt_url=this.chargeObject.receipt_url;
          console.log(this.paymentStatus,this.balance_transaction,this.receipt_url);
          console.log(this.chargeObject);                   
          console.log(this.custStripeId,this.cardId) 
          console.log("horha kya");     
          this.service.deleteCard(this.custStripeId,this.cardId).subscribe(data=>{
            console.log("ama yaar");
            if(this.paymentStatus=="succeeded"){
              this.paymentSuccess=!this.paymentSuccess;
              this.payment=!this.payment;
              console.log(this.paymentSuccess);
              }
          });
        },(error) =>{ 
          this.err= error;
         });
      });  
      });
    });
    // }
    // else{
    //   this.ms= moment(this.now,"DD/MM/YYYY HH:mm:ss").diff(moment(this.customerDetail.timeStamp,"DD/MM/YYYY HH:mm:ss"));
      
    //   this.timediff = moment.duration(this.ms).asDays();
    // }
    });   

  }

  goToProfile(){
    this.router.navigate(['/buyer-profile',{recUrl:this.receipt_url,balTran:this.balance_transaction,eMail:this.email}]);
  }

  goToIncart(){
    this.router.navigate(['']);
  }

}
