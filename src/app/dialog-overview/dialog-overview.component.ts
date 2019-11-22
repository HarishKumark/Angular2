import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface DialogData {

  deliveryDate;
  scrumTeam;
  businessUnit;
}


@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent implements OnInit {

  dialogForm: FormGroup;
  multipleCheckBox: any;
  @Output() selectedCheckBox = new EventEmitter();
  checkedVal: any = [];

  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<DialogOverviewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    this.dialogRef.updatePosition({
      right: '40%'
    });

    this.createForm();
    setTimeout((res) => {
      // tslint:disable-next-line: max-line-length
      this.multipleCheckBox = ['Case Information (Iteration)', 'Case Information (Toast pop)', 'Not Ready Reasons', 'Disposition Codes', 'Caller ID', 'Screen pop',
        'Corporate Favourites'];
    });
  }

  createForm() {
    this.dialogForm = this.fb.group({
      multipleCheckBox: this.fb.array([])
    });
  }

  onChange(event) {
    // console.log('event --- ', event);
    if (event.checked) {
      this.checkedVal.push(event.source.value);
    } else {
      // this.
      const index = this.checkedVal.indexOf(event.source.value);
      if (index > -1) {
        this.checkedVal.splice(index, 1);
      }
      // this.checkedVal.p
    }

    // console.log('this.checkedVal --- ', this.checkedVal);
    this.selectedCheckBox.emit(this.checkedVal);
  }

}
