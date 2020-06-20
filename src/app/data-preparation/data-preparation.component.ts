import { Component } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-data-preparation',
  templateUrl: './data-preparation.component.html',
  styleUrls: ['./data-preparation.component.scss']
})
export class DataPreparationComponent {

  public processing: boolean = false;
  private file: File = null;
  private file_valid: boolean = true;
  public mode: string = 'randomforest';

  constructor(private fileService: FileService) { }

  public handleFileInput(files: FileList) {
    const file = files.item(0);
    if (this.validateFile(file)) {
      this.file_valid = true;
      this.file = file;
    } else {
      this.file_valid = false;
      this.file = null;
    }
  }

  public onModeChange(value: string) {
    this.mode = value;
  }

  public getCleanData() {
    if (!this.file_enabled || this.processing) {
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.processing = true;
      this.fileService.prepData(fileReader.result.toString())
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
          },
          (error: any) => {
            this.handleError(error);
          },
          () => {
            this.processing = false;
          }
        )
    }

    fileReader.readAsText(this.file);
  }

  private handleError(error) {
    console.log(error);
    this.processing = false;
  }

  public trainModel() {
    if (!this.file_enabled || this.processing) {
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.processing = true;
      this.fileService.trainModel(fileReader.result.toString(), this.mode)
        .subscribe(
          (response: any) => {
            console.log(response)
          },
          (error: any) => {
            this.handleError(error);
          },
          () => {
            this.processing = false;
          }
        )
    }

    fileReader.readAsText(this.file);
  }

  public get file_enabled(): boolean {
    return this.file !== null && this.file_valid;
  }

  private validateFile(file: File): boolean {
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() !== 'csv') {
      return false;
    }

    if(file.size/1024/1024 > 5) {
      return false;
    }

    return true;
  }
}
