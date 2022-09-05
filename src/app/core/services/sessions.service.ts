import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AuthUser } from '../modals/auth.modal';


@Injectable({
  providedIn: 'root',
})
export class SessionsService {

    @Output() refreshPrfileImage: EventEmitter<boolean> = new EventEmitter();
    @Output() refreshProductCounts: EventEmitter<boolean> = new EventEmitter();

    public setStorage(user: AuthUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    public getStorage() {
        return localStorage.getItem('user')!;
    }

    public getAuthToken(): string {
    const currentUser = JSON.parse(this.getStorage());
    if (currentUser != null) {
        return currentUser['token'];
    }
    return '';

    }
    public getUserId(): string {
        const currentUser = JSON.parse(this.getStorage());
        if (currentUser != null) {
            return currentUser['userId'];
        }
        return '';
    }
    public getUserMailId(): string {
        const currentUser = JSON.parse(this.getStorage());
        if (currentUser != null) {
            return currentUser['email'];
        }
        return '';
    }
    public getCurrentUser(): string {
        const currentUser = JSON.parse(this.getStorage());
        if (currentUser != null) {
            return currentUser;
        }
        return '';
    }
    public getUserType(): string {
        const currentUser = JSON.parse(this.getStorage());
        if (currentUser != null) {
            return currentUser['userType'];
        }
        return '';
    }
    public getCompanyUniqueId(): string {
        const currentUser = JSON.parse(this.getStorage());
        if (currentUser != null) {
            return currentUser['companyId'];
        }
        return '';
    }
    public getSupplierType(): string {
        const currentUser = JSON.parse(this.getStorage());
        if (currentUser != null) {
            return currentUser['supplierType'];
        }
        return '';
    }
    // changeProfileImage(val) {
    //     this.refreshPrfileImage.emit(val);
    //   }

    // changeSupplierProductCounts(val) {
    //     this.refreshProductCounts.emit(val);
    //   }
}
