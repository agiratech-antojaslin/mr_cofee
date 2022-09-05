import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { SignupComponent } from './auth/signup/signup.component';
//import { RouterModule, Router } from '@angular/router';
import { ThemeModule } from '../theme/theme.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CategoryComponent } from './admin/category/category.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';
import { ProductComponent } from './admin/product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { DeleteCategoryComponent } from './admin/category/delete-category/delete-category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteProductComponent } from './admin/product/delete-product/delete-product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { MatSelectModule } from '@angular/material/select';
import { OrderComponent } from './admin/order/order.component';
import { AddOrderComponent } from './admin/order/add-order/add-order.component';
import { EditOrderComponent } from './admin/order/edit-order/edit-order.component';
import { DeleteOrderComponent } from './admin/order/delete-order/delete-order.component';

@NgModule({
  declarations: [
    //PagesComponent,
    HomeComponent,
    DashboardComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ProductComponent,
    DeleteCategoryComponent,
    DeleteProductComponent,
    AddProductComponent,
    EditProductComponent,
    OrderComponent,
    AddOrderComponent,
    EditOrderComponent,
    DeleteOrderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ThemeModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule
    //RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [ DeleteCategoryComponent, DeleteProductComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class PagesModule { }
