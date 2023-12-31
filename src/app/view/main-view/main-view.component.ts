import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  public typeSelected: string = 'buy';
  public coinRateBuy: string = '15.5';
  public totalCoin: number = 99999;
  public buyingForm: FormGroup;
  public messIdError = '';
  public messValueError = '';
  public needToPay: number;
  public coinRateSell: string = '15.0';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.exchangeValueCash();
  }

  public createForm() {
    this.buyingForm = this.fb.group({
      steamId: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(17), Validators.maxLength(17)]],
      coinValue: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(1), Validators.maxLength(6), Validators.min(5), Validators.max(this.totalCoin)]],
      cashPay: ['']
    });
  }

  public exchangeValueCash() {
    this.buyingForm.get('coinValue')?.valueChanges.subscribe((value) => {
      this.buyingForm.get('cashPay')?.setValue(`${this.transformNumber(value * 15500)} VNĐ`);
    });
  }

  public checkValidateIdForm(): boolean {
    if (this.buyingForm.controls['steamId'].errors?.['minlength'] ||
     this.buyingForm.controls['steamId'].errors?.['maxlength'] ||
     this.buyingForm.controls['steamId'].errors?.['required']) {
      this.messIdError = 'SteamID độ dài là 17 số. Hãy nhập lại!';
      return false;
     } 
     if (this.buyingForm.controls['steamId'].errors?.['pattern']) {
      this.messIdError = 'SteamID chỉ bao gồm số. Hãy nhập lại!';
      return false;
     } 
     return true;
  }


  public checkValidateValueForm(): boolean {
     if (this.buyingForm.controls['coinValue'].errors?.['required']) {
      this.messValueError = 'Nhập số lượng muốn bán';
      return false;
     } 
     if (this.buyingForm.controls['coinValue'].errors?.['pattern']) {
      this.messValueError = 'Không bao gồm chữ cái. Hãy nhập lại!';
      return false;
     } 

     if (this.buyingForm.controls['coinValue'].errors?.['min'] || this.buyingForm.controls['coinValue'].errors?.['max']) {
      this.messValueError = 'SL mua không được nhỏ hơn 5 và lớn hơn SL khả dụng. Hãy nhập lại';
      return false;
     }
     return true;
  }

  public onBuyCoin() {
    console.log(this.buyingForm);
    const isCheckValidateId = this.checkValidateIdForm();
    const isCheckValidateValue = this.checkValidateValueForm();
    if (isCheckValidateId && isCheckValidateValue) {
      this.showDialog();
      this.defaultErrorMessenger();
      console.log('success!!');
    }
  }

  public defaultErrorMessenger() {
    this.messValueError = '';
    this.messIdError = '';
  }

  public transformNumber(value: number): string {
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue;
  }

  public showDialog() {
    this.dialog.open(DialogViewComponent, {
      disableClose: false,
      maxHeight: '90vh',
      data: {
        steamId: this.buyingForm.value['steamId'],
        coinValue: this.buyingForm.value['coinValue'],
        cashPay: this.buyingForm.value['cashPay']
      }
    });
  }

  public openLink() {
    window.open('https://www.facebook.com/linhdv4013/');
  }

}
