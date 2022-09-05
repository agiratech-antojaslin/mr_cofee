import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/core/modals/category.modal';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  addProductData: any = {};
  addProductErr: string = '';
  isProductActive: Boolean = false;
  categories!: Array<Category>;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private productService: ProductService,
              private categoryService: CategoryService) { 
    this.categoryService.getCategories().pipe(map((responseData: { [key: string] : any }) => {
      const postData: Category [] = [];
      for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
              postData.push({ ...responseData[key], key: key});
              //this.questions.push(responseData[key]);
          }
      }
      return postData;
    })).subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });
  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group(
      {
        product: ['', Validators.required],
        description: ['', Validators.required],
        categoryId: ['', Validators.required],
        price: ['', Validators.required],
        status: ['']
      }
    );
  }

  changeProductStatus(event: MatSlideToggleChange) {

    if(event.checked) {
      this.isProductActive = true;
    } else {
      this.isProductActive = false;
    }
    console.log('toggle', this.isProductActive);
    //console.log("Category status is", this.isCategoryActive);
    
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      // do what you wnat with your data
      this.addProductData = {
        product: this.addProductForm.controls['product'].value,
        description: this.addProductForm.controls['description'].value,
        category_id: this.addProductForm.controls['categoryId'].value,
        price: this.addProductForm.controls['price'].value,
        status: this.isProductActive
      }
      this.productService.createProduct(this.addProductData).subscribe( 
        result => {
          console.log(result);
          this.router.navigate(['admin/product']);
        },
        error => {
          this.addProductErr = error.message
        }
      )
      // if(this.categoryService.createCategory(this.addProductData)) {
      //   this.router.navigate(['admin/category']);
      // } else {
      //   this.addProductErr = "Invalid login details";
      // }
    }
  }

}
