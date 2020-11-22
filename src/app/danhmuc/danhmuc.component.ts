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

  list:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    this.list = {};
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('/api/Product/pro-by-menu/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.list = res;
        
        setTimeout(() => {
          this.loadScripts();

        });
      }); 
    });

  }
}
