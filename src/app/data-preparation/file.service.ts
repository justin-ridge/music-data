import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  postFile(fileContent: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/zip'
    });

    const postData = {
      data: fileContent
    }

    return this.http.post(
      environment.apiUrl + 'api/songs/prepdata',
      JSON.stringify(postData),
      { headers: headers, responseType: 'blob' as 'json' });
  }
}