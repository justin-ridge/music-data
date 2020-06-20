import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelResponse } from '../model-response';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  public prepData(fileContent: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/zip'
    });

    const postData = {
      data: fileContent
    }

    return this.http.post(
      environment.apiUrl + 'api/songs/prepdata',
      JSON.stringify(postData),
      { headers: headers, responseType: 'blob' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  public trainModel(fileContent: string, mode: string): Observable<ModelResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const postData = {
      data: fileContent
    }

    const url = environment.apiUrl + 'api/songs/' + mode;
    return this.http.post<ModelResponse>(
      url,
      JSON.stringify(postData),
      { headers: headers }).pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      let err = error.error;
      if (error.error instanceof Blob) {
        const reader = new FileReader()
        err = reader.readAsText(error.error);
      }

      if(!err || err.length < 1) {
        err = error.message;
      }

      console.log('err:' + err)
      errorMessage = err;
    }

    return throwError(errorMessage);
  }
}