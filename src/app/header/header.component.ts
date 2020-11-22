import { Component, OnInit, Injector } from '@angular/core';
import {BaseComponent} from './../lib/base-component';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  menu: any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this.getmenuall();
   
  }
  getmenuall(){
    Observable.combineLatest(
      
      this._api.get('/api/menu/get-all-mn'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.menu = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    }

}
