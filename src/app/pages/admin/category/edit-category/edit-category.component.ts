import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/core/modals/category.modal';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm!: FormGroup;
  editCategoryData: any = {};
  editCategoryErr: string = '';
  isCategoryActive: Boolean = false;
  categoryID!: string;
  updateCategory!: Category;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editCategoryForm = this.fb.group(
      {
        category: ['', Validators.required],
        description: ['', Validators.required],
        status: ['']
      }
    );
    //this.categoryID = this.activatedRoute.snapshot.paramMap.get("id")!;
    
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params['id']);
      this.categoryID = params['id'];
      this.categoryService.getSingleCategory(this.categoryID).pipe((responseData) => {
        // const postData: Category;
        // for(const key in responseData) {
        //     if(responseData.hasOwnProperty(key)) {
        //         postData.push({ ...responseData[key], key: key});
        //         //this.questions.push(responseData[key]);
        //     }
        // }
        return responseData;
      }).subscribe(category => {
        console.log(category);
        this.updateCategory = category;
        this.editCategoryForm.controls['category'].setValue(category.category);
        this.editCategoryForm.controls['description'].setValue(category.description);
        this.editCategoryForm.controls['status'].setValue(category.status);
        this.isCategoryActive = category.status;
      });
    });
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
    if (this.editCategoryForm.valid) {
      // do what you wnat with your data
      this.editCategoryData = {
        category: this.editCategoryForm.controls['category'].value,
        description: this.editCategoryForm.controls['description'].value,
        products: this.updateCategory.products,
        status: this.isCategoryActive
      }
      this.categoryService.updateCategory(this.editCategoryData, this.categoryID).subscribe( 
        result => {
          console.log(result);
          this.router.navigate(['admin/category']);
        },
        error => {
          this.editCategoryErr = error.message
        }
      )
      // if(this.categoryService.createCategory(this.editCategoryData)) {
      //   this.router.navigate(['admin/category']);
      // } else {
      //   this.editCategoryErr = "Invalid login details";
      // }
    }
  }

}
