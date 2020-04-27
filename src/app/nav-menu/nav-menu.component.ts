import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './nav-menu.component.html'  
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  constructor() { }
  userDisplayName:string;
 @Output() notifyLogout:EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.userDisplayName = localStorage.getItem('userDisplayName');
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  onLogOut()
  {
  this.notifyLogout.emit("True");
  }

}
