import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceDbService {
  private apiUrl = 'https://sheetdb.io/api/v1/0ay8qclsbuuov';
  // private apiUrl = 'https://sheetdb.io/api/v1/0ay8qclsbuuov?sheet=sell';

  constructor(private http: HttpClient) {}

  postData(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
