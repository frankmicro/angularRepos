import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Globals } from '../helpers/globals';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  is_instruction:number = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router, 
    private globals: Globals
  ) { }

  ngOnInit() {
    this.is_instruction = this.authService.isInstruction(); 
    this.globals.LoaderGlobal = false;
  }

  changeStatus() {
    this.globals.LoaderGlobal = true;
    this.apiService.setInstructions().subscribe((res) => {
        if (res.status == 200) {
          let userData = this.authService.userDetails();
          
          // Change value
          userData.is_instruction = 1
          
          // Save the new item with updated value
          this.authService.updateUserFlags(userData);
          
          this.is_instruction = this.authService.isInstruction();
          this.router.navigateByUrl('/changepassword');
        }
    })
  }

}
