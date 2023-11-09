import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  public typeSelected: string = 'buy';

  public buyingForm = new FormGroup({
    steamId: new FormControl(''),
    coinValue: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

}
