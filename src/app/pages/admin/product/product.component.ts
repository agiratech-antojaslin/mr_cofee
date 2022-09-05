import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Dialog } from 'src/app/core/modals/dialog.modal';
import { Product } from 'src/app/core/modals/product.modal';
import { User } from 'src/app/core/modals/user.modal';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  color!: String;
  users!: Array<User>;
  products!: Array<Product>;

  constructor(private router: Router, 
            @Inject(UserService) userService: UserService, 
            @Inject(ProductService) private productService: ProductService,
            public dialog: MatDialog
            ) { 
    
  }
  ngOnInit(): void {
    this.productService.getProducts().pipe(map((responseData: { [key: string] : any }) => {
      const postData: Product [] = [];
      for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
              postData.push({ ...responseData[key], key: key});
              //this.questions.push(responseData[key]);
          }
      }
      return postData;
    })).subscribe(products => {
      console.log(products);
      this.products = products;
      this.dataSource = products;
    });
  }

  displayedColumns: string[] = ['product', 'description', 'categoryId', 'price', 'status', 'actions'];
  dataSource!: Product[];
  @ViewChild(MatSort) sort!: MatSort;
  
  goTo(page: string, id: string) {
    if(page == "edit") {
      this.router.navigate(['admin/product/' + page + '/' + id]);
    } else {
      this.router.navigate(['admin/product/' + page]);
    }
    
  }

  deleteProduct(id: string, product: string) {
    // console.log(id);
    // this.productService.deleteCategory(id).subscribe(
    //   result => {
    //     console.log(result);
    //     //this.router.navigate(['admin/category']);
    //     this.ngOnInit();
    //   },
    //   error => {
    //     //this.addCategoryErr = error.message
    //   }
    // )
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '400px',
      data: new Dialog(product),
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        this.productService.deleteProduct(id).subscribe(
          result => {
            console.log(result);
            //this.router.navigate(['admin/category']);
            this.ngOnInit();
          },
          error => {
            //this.addCategoryErr = error.message
          }
        )
      }
      //this.animal = result;
    });
  }

}
