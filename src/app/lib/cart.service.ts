import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items = this.itemsSubject.asObservable();
  constructor() {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    if (!local_storage) {
      local_storage = [];
    }
    this.itemsSubject.next(local_storage); 
  }
  
  addToCart(product) {
    product.quantity = 1;
    let local_storage:any;
    if (localStorage.getItem('cart') == null) {
      local_storage = [product];
    } else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      let ok = true;
      for (let x of local_storage) {
        if (x.iD_PROD == product.iD_PROD) {
          x.quantity += 1;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(product); 
      } 
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  getItems() {
    if (localStorage.getItem('cart') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }

  deleteItem(iD_PROD) {
    let local_storage = this.getItems().filter((x) => x.iD_PROD != iD_PROD);
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  addQty(product) {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    for (let x of local_storage) {
      if (x.iD_PROD == product.iD_PROD) {
        x.quantity = product.quantity;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  numberOfItems() {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    return local_storage.length;
  }

  clearCart() {
   localStorage.clear();
   this.itemsSubject.next(null);
  }
}
