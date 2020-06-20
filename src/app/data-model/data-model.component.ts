import { Component, OnInit, Input } from '@angular/core';
import { ModelResponse } from '../model-response';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-data-model',
  templateUrl: './data-model.component.html',
  styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {

  @Input() model: ModelResponse;
  public active: number = 0;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  public sanitize(imageStr: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + imageStr);
  }
}
