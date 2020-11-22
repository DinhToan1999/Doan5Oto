import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { ChitietComponent } from './chitiet/chitiet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QlyteComponent } from './qlyte/qlyte.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
   
  },
  {
    path:'chitiet/:id',
    component: ChitietComponent,
  },
  {
    path:'danhmuc',
    component: DanhmucComponent,
  },
  {
    path:'qlye',
    component: QlyteComponent,
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ChitietComponent,
    QlyteComponent,
    DanhmucComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
