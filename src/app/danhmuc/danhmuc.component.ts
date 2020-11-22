import { Component, OnInit, Injector } from '@angular/core';
import {BaseComponent} from './../lib/base-component';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent extends BaseComponent implements OnInit {
  mn: any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this.getmenuall();
   
  }
  getmenuall(){
    Observable.combineLatest(
      
      this._api.get('/api/Product/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.mn = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    }
}
