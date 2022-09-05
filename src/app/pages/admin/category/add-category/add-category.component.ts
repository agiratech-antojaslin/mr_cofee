import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;
  addCategoryData: any = {};
  addCategoryErr: string = '';
  isCategoryActive: Boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group(
      {
        category: ['', Validators.required],
        description: ['', Validators.required],
        status: ['']
      }
    );
  }

  changeCategoryStatus(event: MatSlideToggleChange) {

    if(event.checked) {
      this.isCategoryActive = true;
    } else {
      this.isCategoryActive = false;
    }
    console.log('toggle', this.isCategoryActive);
    //console.log("Category status is", this.isCategoryActive);
    
  }

  onSubmit() {
    if (this.addCategoryForm.valid) {
      // do what you wnat with your data
      this.addCategoryData = {
        category: this.addCategoryForm.controls['category'].value,
        description: this.addCategoryForm.controls['description'].value,
        products: 0,
        status: this.isCategoryActive
      }
      this.categoryService.createCategory(this.addCategoryData).subscribe( 
        result => {
          console.log(result);
          this.router.navigate(['admin/category']);
        },
        error => {
          this.addCategoryErr = error.message
        }
      )
      // if(this.categoryService.createCategory(this.addCategoryData)) {
      //   this.router.navigate(['admin/category']);
      // } else {
      //   this.addCategoryErr = "Invalid login details";
      // }
    }
  }

}
