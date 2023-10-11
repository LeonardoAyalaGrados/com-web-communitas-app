import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: number }){

  }
  ngOnInit(): void {
    console.log(this.data);
  }
}
