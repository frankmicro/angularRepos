import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  loginFlag : boolean = true;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({  
      'email' : new FormControl(null,[Validators.required, Validators.email]),
      'password' : new FormControl(null,Validators.required),
      'player_id' : new FormControl(null,Validators.required)
    });
  }

  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loginFlag = true;
      let params = this.loginForm.value;
      this._authService.login(params).subscribe(res => {
        if (this._authService.isLoggedIn()) {
          Swal.fire('Login successfully!', 'success');
        }
      });
    }
  }

}
