import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EncrDecrService} from './services/encr-decr.service';
import { Globals } from '@shared/helpers/globals';
import { UserComponent } from './modals/user/user.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { NoDblClickDirective } from './directives/no-dbl-click.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from "../interceptor/httpconfig.interceptor";

@NgModule({
  declarations: [
    UserComponent,
    DebounceClickDirective,
    NoDblClickDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    Globals,
    AuthService,
    AuthGuard,
    [EncrDecrService],
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfigInterceptor, multi: true
    }
  ],
  exports: [
    DebounceClickDirective,
    NoDblClickDirective
  ],
  entryComponents: [
    UserComponent
  ]
})
export class SharedModule { }
