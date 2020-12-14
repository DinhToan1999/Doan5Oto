import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from '../lib/base-component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {
  items:any;
  total:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this._cart.items.subscribe((res) => {
      this.items = res;
      this.total = 0;
      for(let x of this.items){ 
        x.money = x.quantity * x.PRICE;
        this.total += x.quantity * x.PRICE;
      } 
    });
  } 
  clearCart() { 
    this._cart.clearCart();
    alert('Xóa thành công');
  }
  addQty(PRODUCT, quantity){ 
    PRODUCT.quantity =  quantity;
    PRODUCT.money =  Number.parseInt(PRODUCT.quantity) *  PRODUCT.PRICE;
    this._cart.addQty(PRODUCT);
  }
}
