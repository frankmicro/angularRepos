import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Globals } from '../helpers/globals';
import { ApiService } from '../services/api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private uploadModal:any = false;
  private isSubmited:boolean = false;
  private imgLink:any = '';
  private preview:boolean = false;
  private avatarType:string = '';
  private subscription: ISubscription;

  constructor(
    private globals:Globals,
    private apiService:ApiService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.globals.LoaderGlobal = true;
    this.subscription = this.apiService.getPreviewImage().subscribe((res)=>{
      if (res['code'] == 200) {
        this.imgLink = res['img_link'];
        this.preview = true;
        this.globals.LoaderGlobal = false;
      }
    });
  }

  fileChangeEvent(event: any): void { // events target
    this.imageChangedEvent = event;
    this.globals.Jala = false;
    this.globals.Vyom = false;
  }

  imageCropped(event: ImageCroppedEvent) { // gets image
    this.croppedImage = event.base64;
  }

  imageLoaded() { // invoke modal
    this.uploadModal = true;
  }

  selectMe(flag) {
    if (this.isSubmited) {
      return false;
    }

    if (flag) {
      this.globals.Jala = false;
      this.globals.Vyom = true;
      this.avatarType = 'vyom';
    } else {
      this.globals.Vyom = false;
      this.globals.Jala = true;
      this.avatarType = 'jala';
    }
  }

  saveImage() {
    this.globals.LoaderGlobal = true;
    let payload = {
        "image":this.croppedImage,
        "avatarType": this.avatarType,
        "userId": this.authService.getUserId(),
        "api":true
      }
    
    this.apiService.saveAvatar(payload).subscribe((res)=>{
      if (res.code == 200) {
          Swal.fire({
            text: 'Avatar created Successfully!',
            type: 'success',
            confirmButtonText: 'Ok!',
          }).then((result) => {
            if (result) {
              this.isSubmited = true;
              this.globals.Jala = false;
              this.globals.Vyom = false;
              this.uploadModal = false;
              this.imgLink = res.img_link;
              this.preview = true;
              this.globals.LoaderGlobal = false;
            }
          })
      }
    })
  }

  updateUserFlag() {
    this.globals.LoaderGlobal = true;
    this.apiService.updateUserFlag().subscribe((res)=>{
      if (res.code == 200) {
        Swal.fire({
          text: 'Avatar saved Successfully!',
          type: 'success',
          confirmButtonText: 'Ok!',
        }).then((result) => {
          if (result) {
            let userData = this.authService.userDetails();

            // Change value
            userData.is_avatar = 1

            // Save the new item with updated value
            this.authService.updateUserFlags(userData);
            
            this.route.navigateByUrl('/profile/personal-info');
          }
        })
      }
    })
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
