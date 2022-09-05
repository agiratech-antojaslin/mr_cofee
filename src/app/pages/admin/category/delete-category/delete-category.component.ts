import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from 'src/app/core/modals/dialog.modal';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  categoryName!: string;

  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog) { }

  ngOnInit(): void {
    this.categoryName = this.data.name;
  }

  yesButtonClicked(): void {
    this.dialogRef.close(true);
  }

  cancelButtonClicked(): void {
    this.dialogRef.close(false);
  }

}


