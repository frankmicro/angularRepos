import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
    forgotForm: FormGroup;
       protected submitted:Boolean = false;
	   protected danger:Boolean=false;
	   protected success:Boolean=false;
	   protected successMsg:string=null;
	   protected errMsg:string=null;
	   protected butForgot:Boolean=false;
	   protected butLoader:Boolean=false;

    constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.forgotForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotForm.invalid) {
            return;
        }

	this.butForgot=false;
	this.butLoader=true;
    let params = this.forgotForm.value;
    this.authService.forgotPassword(params.email)
      .subscribe((res) => {
      	if(res.status === 200){
			this.danger=false;
			this.success=true;
			this.successMsg=res.message;
			this.errMsg=null;
      	}else{
      		this.danger=true;
			this.success=false;
			this.errMsg=res.message;
			this.successMsg=null;
      	}
  			this.butForgot=false;
  			this.butLoader=false;
      });

      return false;
    }

}
