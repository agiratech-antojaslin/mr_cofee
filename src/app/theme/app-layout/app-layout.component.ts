import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavItem } from '../../nav-item';
import { NavService } from '../../nav.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  @ViewChild('appDrawer') appDrawer: ElementRef | undefined;
  version = VERSION;
  showFiller = false;
  showAdminPanel = false;
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];
 
  constructor(private navService: NavService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if(this.authService.isUserLogged() ==  true) {
      this.showAdminPanel = true;
    }
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout() {
    this.authService.userLogout();
    this.router.navigate(['']);
  }


}
