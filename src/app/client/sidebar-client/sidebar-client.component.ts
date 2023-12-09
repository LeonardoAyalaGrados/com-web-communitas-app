import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidebar-client',
  templateUrl: './sidebar-client.component.html',
  styleUrls: ['./sidebar-client.component.css']
})
export class SidebarClientComponent {

  constructor(private spinnerService: NgxSpinnerService){

  }
  showSpinner() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000); 
  }
}
