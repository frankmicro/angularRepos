import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/layouts/header/header.component';
import { ThemeRoutingModule } from './modules/theme-routing.module';
import { ProductsComponent } from './views/products/products.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './views/layouts/sidebar/sidebar.component';
import { PastOrdersComponent } from './views/past-orders/past-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    SidebarComponent,
    PastOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ThemeRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
