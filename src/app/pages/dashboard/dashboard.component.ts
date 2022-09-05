import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showAdminPanel!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showAdminPanel = true;
    console.log("Comes to dashboard")
  }

}
