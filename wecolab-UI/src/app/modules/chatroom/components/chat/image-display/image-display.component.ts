import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../Shared/chatting.service';

interface DialogData {
  user: User;
}

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ImageDisplayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setDefaultPic() {
    this.data.user.profilePic =  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuanYj9zOSmcbdmfhl4wbtQajRrrsF0TpUV8iUERdbgs5My-f3';
  }

}
