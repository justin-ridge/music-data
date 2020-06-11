import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Popularity } from './popularity';
import { Prediction } from './prediction';

@Injectable({
  providedIn: 'root'
})
export class PopularityService {

  public predict$: Observable<Prediction>;
  private predictBehavior: BehaviorSubject<Prediction> = new BehaviorSubject<Prediction>({
    result: '0',
    confidence: 0
  });
  
  constructor(private http: HttpClient) {
    this.predict$ = this.predictBehavior.asObservable();
  }

  public predict(pop: Popularity): void {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(environment.apiUrl + 'api/songs/predict', JSON.stringify(pop), { headers: headers })
      .subscribe((result: Prediction) => {
        this.predictBehavior.next(result);
      });
  }

  public clearPrediction(): void {
    this.predictBehavior.next(null);
  }
}
