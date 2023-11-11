import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServiceDbService } from 'src/app/service/service-db.service';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogViewComponent implements OnInit {

  public steamId = '';
  public coinValue = '';
  public cashPay: any ;

  public onLoading = false;

  constructor(public dialogRef: MatDialogRef<DialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {steamId: string, coinValue: string, cashPay: number},
    private toastr: ToastrService,
    private service: ServiceDbService) {
      this.steamId = data.steamId;
      this.coinValue = data.coinValue;
      this.cashPay = this.transformNumber(data.cashPay);
    }

  ngOnInit(): void {
    
  }

  public onSuccess() {
    this.onLoading = true;
    const data = {steamId: this.steamId, coinValue: this.coinValue, cashPay: this.cashPay};
    this.service.postData(data).subscribe(() => {
      this.toastr.success('Vui lòng đợi trong giây lát!', 'Thành công');
      this.dialogRef.close();
      this.onLoading = false;
    }, () => {
      this.toastr.error('Vui lòng thử lại sau ', 'Thất bại');
      this.dialogRef.close();
      this.onLoading = false;
    })
  }

  transformNumber(value: number): string {
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue;
  }
}
