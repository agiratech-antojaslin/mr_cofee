import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';
import { map, Observable, of, range } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/modals/user.modal';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/modals/category.modal';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { Dialog } from 'src/app/core/modals/dialog.modal';

// export interface PeriodicElement {
//   id: number;
//   category: string;
//   status: boolean
// }

// const ELEMENT_DATA: Category[] = [
//   {category: 'Juice', status: true},
//   {category: 'Helium', status: true },
//   {category: 'Lithium', status: true },
//   {category: 'Beryllium', status: true },
//   {category: 'Boron', status: true },
//   {category: 'Carbon', status: true },
//   {category: 'Nitrogen', status: true },
//   {id: 8, category: 'Oxygen', status: true },
//   {id: 9, category: 'Fluorine', status: true },
//   {id: 10, category: 'Neon', status: true },
// ];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  color!: String;
  users!: Array<User>;
  categories!: Array<Category>;
  obs = new Observable((observer) => {
    console.log("Observable starts")
    observer.next("1")
    observer.next("2")
    observer.next("3")
    observer.next("4")
    observer.next("5")
  })

  //users!: User[];

  constructor(private router: Router, 
            @Inject(UserService) userService: UserService, 
            @Inject(CategoryService) private categoryService: CategoryService,
            public dialog: MatDialog
            ) { 
    
  }
  ngOnInit(): void {
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
      this.dataSource = categories;
    });
  }

  displayedColumns: string[] = ['category', 'description', 'products', 'status', 'actions'];
  dataSource!: Category[];
  @ViewChild(MatSort) sort!: MatSort;
  
  goTo(page: string, id: string) {
    if(page == "edit") {
      this.router.navigate(['admin/category/' + page + '/' + id]);
    } else {
      this.router.navigate(['admin/category/' + page]);
    }
    
  }

  deleteCategory(id: string, category: string) {
    // console.log(id);
    // this.categoryService.deleteCategory(id).subscribe(
    //   result => {
    //     console.log(result);
    //     //this.router.navigate(['admin/category']);
    //     this.ngOnInit();
    //   },
    //   error => {
    //     //this.addCategoryErr = error.message
    //   }
    // )
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: '400px',
      data: new Dialog(category),
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        this.categoryService.deleteCategory(id).subscribe(
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
