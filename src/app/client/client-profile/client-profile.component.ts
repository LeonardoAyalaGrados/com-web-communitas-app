import { Component } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent {
  nombreUsuario:any;
  constructor(private userServices:UserServicesService){
    this.nombreUsuario=this.userServices.getUser().fullName;
  }

}
