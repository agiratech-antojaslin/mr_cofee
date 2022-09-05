import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/core/modals/category.modal';
import { Product } from 'src/app/core/modals/product.modal';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProductForm!: FormGroup;
  editProductData: any = {};
  editProductErr: string = '';
  isProductActive: Boolean = false;
  categories!: Array<Category>;
  productID: string = '';
  updateProduct!: Product;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private productService: ProductService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) { 
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

    this.productID = activatedRoute.snapshot.params['id'];
    console.log("Product ID", this.productID);

    if(this.productID != '' && this.productID != null) {
      this.productService.getSingleProduct(this.productID).pipe((responseData) => {
        // const postData: Category;
        // for(const key in responseData) {
        //     if(responseData.hasOwnProperty(key)) {
        //         postData.push({ ...responseData[key], key: key});
        //         //this.questions.push(responseData[key]);
        //     }
        // }
        return responseData;
      }).subscribe(product => {
        console.log(product);
        this.updateProduct = product;
        this.editProductForm.controls['product'].setValue(product.product);
        this.editProductForm.controls['description'].setValue(product.description);
        this.editProductForm.controls['categoryId'].setValue(product.category_id);
        this.editProductForm.controls['price'].setValue(product.price);
        this.editProductForm.controls['status'].setValue(product.status);
        this.isProductActive = product.status;
      });
    }

  }

  ngOnInit(): void {
    this.editProductForm = this.fb.group(
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
    if (this.editProductForm.valid) {
      // do what you wnat with your data
      this.editProductData = {
        product: this.editProductForm.controls['product'].value,
        description: this.editProductForm.controls['description'].value,
        category_id: this.editProductForm.controls['categoryId'].value,
        price: this.editProductForm.controls['price'].value,
        status: this.isProductActive
      }
      this.productService.updateProduct(this.editProductData, this.productID).subscribe( 
        result => {
          console.log(result);
          this.router.navigate(['admin/product']);
        },
        error => {
          this.editProductErr = error.message
        }
      )
      // if(this.categoryService.createCategory(this.editProductData)) {
      //   this.router.navigate(['admin/category']);
      // } else {
      //   this.editProductErr = "Invalid login details";
      // }
    }
  }

}
