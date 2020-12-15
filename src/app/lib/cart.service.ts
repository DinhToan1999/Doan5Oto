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
  
  addToCart(PRODUCT) {
    PRODUCT.quantity = 1;
    let local_storage:any;
    if (localStorage.getItem('cart') == null) {
      local_storage = [PRODUCT];
    } else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      let ok = true;
      for (let x of local_storage) {
        if (x.ID_PROD == PRODUCT.ID_PROD) {
          x.quantity += 1;
          ok = false;
          break;
        }
      }
      if(ok){
        local_storage.push(PRODUCT); 
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

  deleteItem(ID_PROD) {
    let local_storage = this.getItems().filter((x) => x.ID_PROD != ID_PROD);
    localStorage.setItem('cart', JSON.stringify(local_storage));
    this.itemsSubject.next(local_storage);
  }

  addQty(Product) {
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    for (let x of local_storage) {
      if (x.ID_PROD == Product.ID_PROD) {
        x.quantity = Product.quantity;
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
