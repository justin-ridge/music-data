import { Component } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-data-preparation',
  templateUrl: './data-preparation.component.html',
  styleUrls: ['./data-preparation.component.scss']
})
export class DataPreparationComponent {

  private file: File = null;

  constructor(private fileService: FileService) { }

  public handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  uploadFileToActivity() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileService.postFile(fileReader.result.toString())
        .subscribe(
          (response: any) => {
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
            downloadLink.setAttribute('download', 'clean_data.zip');
            document.body.appendChild(downloadLink);
            downloadLink.click();
          }
        )
    }

    fileReader.readAsText(this.file);
  }
}
