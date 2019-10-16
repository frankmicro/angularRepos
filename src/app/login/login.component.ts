import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../helpers/globals';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;

  protected danger:boolean=false;
  protected success:boolean=false;
  protected successMsg:string=null;
  protected errMsg:string=null;
  protected butLogin:boolean=false;
  protected butLoader:boolean=false;


  constructor(
    private authService: AuthService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private toastr: ToastrService,
    private globals:Globals
    ) { }

  ngOnInit() {  
    let token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      this.router.navigateByUrl('/dashboard');
    }
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() { 
    return this.loginForm.controls; 
  }

  login(){ 
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

  this.butLogin=true;
  this.butLoader=true;
  this.globals.LoaderGlobal = true;

    let params = this.loginForm.value;

    this.authService.login(params.email, params.password)
      .subscribe((res) => {
          this.butLogin=false;
          this.butLoader=false;
          if(res.status === 200){
              this.danger=false;
              this.success=true;
              this.successMsg=res.message;
              this.errMsg=null;
              this.authService.storeUserLogin(res.response.success);
              
            if (!this.authService.isInstruction()) {
              this.router.navigateByUrl('/instructions');
            } else {
              this.router.navigateByUrl('/dashboard');
            }
          }else{
              this.danger=true;
              this.success=false;
              this.errMsg=res['response'].message;
              this.successMsg=null;
          }
          this.globals.LoaderGlobal = false;
      });
    
  }
  
}
