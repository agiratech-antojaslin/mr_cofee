import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppLayoutComponent } from '../theme/app-layout/app-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { GuardService } from '../core/services/guard.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';
import { ProductComponent } from './admin/product/product.component';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';

const routes: Routes = [
        {
          path: '',
          component: AuthLayoutComponent,
          children: [
            { path: '', component: SigninComponent},
            { path: 'signup', component: SignupComponent},
            { path: 'forgot-password', component: ForgotPasswordComponent},
          ]
        },
        {
          path: 'admin',
          component: AppLayoutComponent,
          canActivateChild: [GuardService],
          children: [
            { path: 'home', component: HomeComponent },
            { path: 'dashboard', component: DashboardComponent},
            { path: 'category', component: CategoryComponent },
            { path: 'category/add', component: AddCategoryComponent },
            { path: 'category/edit/:id', component: EditCategoryComponent },
            { path: 'product', component: ProductComponent },
            { path: 'product/add', component: AddProductComponent },
            { path: 'product/edit/:id', component: EditProductComponent }
          ]
        },
                        
                        
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
