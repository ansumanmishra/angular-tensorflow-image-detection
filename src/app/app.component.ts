import {Component, ElementRef, ViewChild} from '@angular/core';

import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tensorflow-image-detection';
  @ViewChild('image', {read: ElementRef, static: false}) image: ElementRef;
  @ViewChild('imagePrediction', {read: ElementRef, static: false}) imagePrediction: ElementRef;
  showPredictionLoading = false;
  onChangeImage(event: any ) {

    const image = event.target.files[0];

    if(image) {
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
