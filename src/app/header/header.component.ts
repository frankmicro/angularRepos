import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Globals } from '../helpers/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  is_instruction: '';
  user: any = '';
  name: string = '';
  constructor(
    private authService:AuthService,
    private globals:Globals
  ) { }

  ngOnInit() {
    this.is_instruction = this.authService.isInstruction();
    this.user = this.authService.decrypt();
    this.name = this.user.first_name.charAt(0).toUpperCase() + this.user.first_name.slice(1) + ' ' + this.user.last_name;
  }

  logout() {
    this.authService.logout()
  }

}
