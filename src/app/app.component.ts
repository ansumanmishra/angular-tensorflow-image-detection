import {Component, ElementRef, ViewChild} from '@angular/core';

import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>
        <span translate="no">
          <span style="color:#FF0000">P</span>
          <span style="color:#FF8000">R</span>
          <span style="color:#FFFF00">E</span>
          <span style="color:#007940">D</span>
          <span style="color:#4040FF">I</span>
          <span style="color:#A000C0">C</span>
          <span style="color:#FF0000">T</span>
        </span>
      </h1>
      <h2 #imagePrediction [hidden]="!showPredictionLoading">Predicting 🤔 ...</h2>
      <input id="file-input" type="file" (change)="onChangeImage($event)" />
      <div>
        <label for="file-input">
          <img src="./assets/upload-image.png" alt="Click to upload..." title="Click to upload..." #image width="40%" height="auto">
        </label>
      </div>
      <footer>@copyright</footer>
    </div>
  `,
})
export class AppComponent {
  title = 'angular-tensorflow-image-detection';
  @ViewChild('image', {read: ElementRef, static: false}) image: ElementRef;
  @ViewChild('imagePrediction', {read: ElementRef, static: false}) imagePrediction: ElementRef;
  showPredictionLoading = false;

  onChangeImage(event: any) {
    const image = event.target.files[0];

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = async (res: any) => {
        this.image.nativeElement.src = res.target.result;
        this.showPredictionLoading = true;
        const model = await mobilenet.load();
        const predictions = await model.classify(this.image.nativeElement);
        this.imagePrediction.nativeElement.innerHTML = `Is it a ${predictions[0].className}?`;
      }
    }
  }
}
