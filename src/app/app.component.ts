import { Component, OnInit, ViewChild } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import { Globals } from './helpers/globals';

import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  title = 'app';

  constructor(
    private _loadingBar: SlimLoadingBarService, 
    private _router: Router, 
    private toastrService: ToastrService,
    private titleService: Title,
    private meta: Meta,
    private authService: AuthService, 
    private globals:Globals
    ) { 
    this._router.events.subscribe((event: Event) => {
      //check logged in status
      this.globals.LoggedIn = this.authService.isLoggedIn();
      this.globals.Flags = {
        IsProfileFlag: this.authService.isProfile(),
        IsCpFlag: this.authService.changePassword(),
        IsAvtFlag: this.authService.isAvatar(),
        IsInstructionFlag: this.authService.isInstruction()
      }
      // title and redirection logic
      this.navigationInterceptor(event);
      if (event instanceof NavigationEnd) {
        let currentUrl = '';
        let type = event.url.substr(1);
        let url = type.charAt(0).toUpperCase() + type.slice(1);
        let parts = url.split('/');
        let loc = parts.pop();
        url = url.replace(/\//g, " ");
        url = url.replace("-", " ");
        currentUrl = 'Fitness | ' + url;
        this.titleService.setTitle(currentUrl);
        if (!this.authService.isInstruction()) {
          this._router.navigateByUrl('/instructions');
        } else if (!this.authService.changePassword()) {
          this._router.navigateByUrl('/changepassword');
        } else if (!this.authService.isAvatar()) {
          this._router.navigateByUrl('/avatar');
        } else if (!this.authService.isProfile()) {
          if (url.substring(0, 7) == 'Profile') {
            this._router.navigateByUrl('/profile/' + loc);
          } else {
            this._router.navigateByUrl('/profile/personal-info');
          }
        } 
      }
    });
  }
  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}