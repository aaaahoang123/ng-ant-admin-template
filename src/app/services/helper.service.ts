import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {ACCESS_TOKEN_SECRET_KEY} from '../resources/static.resource';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private authorizeHeader;
  constructor(private http: HttpClient) { }

  /**
   * - Custom upload a img
   * - Please check
   * https://github.com/NG-ZORRO/ng-zorro-antd/blob/cab0536d404aadced9092d7ee82dcb7bf0a7d411/src/components/upload/nz-upload-btn.component.ts
   * From line 169 - 186
   * @param url: string Url to upload image
   * @param item: item that include, provide by upload btn.
   */
  nzCustomUploadImg(url: string, item: any): Promise<any> {
    const form = new FormData();
    form.append('file', item.file);

    const req = new HttpRequest('POST', url, form, {
      reportProgress: true
    });
    return new Promise<any>((s, e) => {
      this.http.request(req).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            event.percent = event.loaded / event.total * 100;
          }
          item.onProgress(event);
        } else if (event instanceof HttpResponse) {
          item.onSuccess(event.body, event);
          s(event.body.data);
        }
      }, err => {
        item.onError(err);
        e(err);
      });
    });
  }

  getAuth(): any {
    if (!this.authorizeHeader) {
      this.authorizeHeader = {
        authorization: localStorage.getItem(ACCESS_TOKEN_SECRET_KEY),
        'Content-Type': 'application/json'
      };
    }
    return this.authorizeHeader;
  }
}
