import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MustMatch } from '../helpers/must-match.validator';
import { AuthService } from '../auth.service';
import { Globals } from '../helpers/globals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePassForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globals: Globals
  ) { }

  ngOnInit() {
    this.globals.LoaderGlobal = false;
    this.changePassForm = this.formBuilder.group({
      old_password:['',Validators.required],
      new_password:['',[Validators.required, Validators.minLength(6)]],
      confirm_password:['',Validators.required],
    },{
        validator: MustMatch('new_password', 'confirm_password')
    });
  }

  get formControls() { 
    return this.changePassForm.controls; 
  }

  changePassword() {
    this.globals.LoaderGlobal = true;
    let payload = this.changePassForm.value;
    payload['userId'] = this.authService.getUserId();

    this.apiService.changePassword(payload).subscribe((res)=> {
      if (res.status == 400) {
        Swal.fire('Error', res.message, 'error');
      } else {
        Swal.fire({
          text: res.message,
          type: 'success',
          confirmButtonText: 'Ok!',
        }).then((result) => {
          if (result) {
            let userData = this.authService.userDetails();

            // Change value
            userData.flag = 1

            // Save the new item with updated value
            this.authService.updateUserFlags(userData);

            this.router.navigateByUrl('/avatar');
          }
        })
      }
    });

  }

}
