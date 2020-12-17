import { BaseComponent } from './../lib/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {
  items:any;
  total:any;
  public billForm: FormGroup;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.billForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone:  new FormControl('', Validators.required),     
      note: new FormControl('', )    
    });

    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;
      for(let x of this.items){ 
        x.so_luong = +x.quantity;
        x.money = x.quantity * x.price;
        this.total += x.quantity * x.price;
      } 
    });
  }
  onSubmit(value: any) {
    
    let bill = {fullname: value.fullname, address:value.address, phone:value.phone,  note:value.note, listjson_detail:this.items};
    this._api.post('/api/bill/create-Bill', bill).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Tạo thành công');
       }, err => { });      0
 
  }
  
}
