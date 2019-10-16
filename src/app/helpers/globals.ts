import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class Globals {
   constructor(
      private authService:AuthService,
   ) {}

   Jala:boolean = false;
   Vyom:boolean = false;
   DashboardClasses: object = { 1: "steps", 2: "calories", 3: "activetime", 4: "bodyweight", 5: "waterintake" };
   Stages:number = 12;
   LoggedIn:any = this.authService.isLoggedIn();
   ProfileData: any = this.authService.isProfileData();
   ObstraticHistory:boolean = false;
   LoaderGlobal = false;

   Flags = {
      IsProfileFlag : this.authService.isProfile(),
      IsCpFlag : this.authService.changePassword(),
      IsAvtFlag : this.authService.isAvatar(),
      IsInstructionFlag : this.authService.isInstruction()
   }

   Steps:any = {
      '1':true,
      '2':false,
      '3':false,
      '4':false,
      '5':false,
      '6':false,
      '7':false,
      '8':false,
   }
}