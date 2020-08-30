import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServerService } from '@shared/services/server.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @ViewChild('templateDriven', {static: false}) loginForm: NgForm;
  @ViewChild('h', {static: false}) loginForm2: NgForm;
  signupForm : FormGroup;

  form: any = {};
  genders = ['male','female'];
  goalOptions = [
    {
      "id":1,
      "value":"football",
      "name":"football",
      "checked":false,
    },
    {
      "id":2,
      "value":"baseball",
      "name":"baseball",
      "checked":false,
    }
  ];

  constructor(private serverService : ServerService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'password' : new FormControl(null, Validators.required),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'hobbies' : new FormArray([])
    });
    this.signupForm.setValue({
      'userData':{
        'email' : 'max@test.com',
        'password' : '1234'
      },
      'hobbies':[]
    });
    this.signupForm.patchValue({
      'userData':{
        'email':'ana@test.com',
        'password' : '1234'
      },
      'hobbies':[]
    });
   this.form.email = "test";
  }

  servers = [
    {
      name : 'TestServer',
      capacity : 60,
      id : this.generateId()
    }
  ];

  generateId() {
    return Math.round(Math.random() * 10000);
  }

  onAddHobby = () => {
    this.serverService.storeServer(this.servers).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // onSubmit = (form : NgForm) => {
  //   console.log(form);
    
  // }

  onSubmit = () => {
    console.log(this.signupForm);
    
    if (!this.loginForm.invalid) {
      console.log(this.loginForm);return;
    }

    // console.log(this.loginForm2);
    // this.loginForm2.form.patchValue({
    //   'email' : 'roh'
    // })
    
  }

  resetVal = () => {
    this.loginForm.reset();
    this.loginForm2.reset();
  }

  forbiddenEmails(control : FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'rohan.parkar@kissht.com') {
          resolve({
            'emailIsForbidden' : true
          });
        } else {
          resolve(null);
        }
      }, 1500);
    })
    return promise;
  }

}
