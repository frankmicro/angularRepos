import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { PagesModule } from '@pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@pages/layouts/header/header.component';
import { FooterComponent } from '@pages/layouts/footer/footer.component';
import { AsidebarComponent } from '@pages/layouts/asidebar/asidebar.component';
import { SharedModule } from '@shared/shared.module';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsidebarComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [
    BsModalRef,
    {
      provide: {
        HTTP_INTERCEPTORS,
        APP_BASE_HREF,
        useValue : '/'
      }, 
      useClass: HttpConfigInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
