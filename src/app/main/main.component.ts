import { Component, OnInit, Injector } from '@angular/core';
import {BaseComponent} from './../lib/base-component';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  list_item:any;
  new:any;
  km:any;
  constructor(injector: Injector) { 
    super(injector);
  }
ngOnInit(): void {
  this.getproall();
  this.GetProdNew();
  this.GetProdKm();
}
getproall(){
Observable.combineLatest(
  
  this._api.get('/api/Product/get-all'),
).takeUntil(this.unsubscribe).subscribe(res => {
  this.list_item = res[0];
  setTimeout(() => {
    this.loadScripts();
  });
}, err => { });
}
GetProdNew(){
  Observable.combineLatest(
  
    this._api.get('/api/Product/get-prod-new'),
  ).takeUntil(this.unsubscribe).subscribe(res => {
    this.new = res[0];
    setTimeout(() => {
      this.loadScripts();
    });
  }, err => { });
}
GetProdKm(){
  Observable.combineLatest(
  
    this._api.get('/api/Product/get-prod-km'),
  ).takeUntil(this.unsubscribe).subscribe(res => {
    this.km = res[0];
    setTimeout(() => {
      this.loadScripts();
    });
  }, err => { });
}
addToCart(n) { 
  this._cart.addToCart(n);
  alert('Thêm thành công!'); 
}
}

