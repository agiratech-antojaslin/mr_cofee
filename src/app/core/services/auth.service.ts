import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from '../modals/auth.modal';
import { User } from '../modals/user.modal';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}
    authenticatedUser!: AuthUser;
    //token!: string;
    isUserLogged() {
    
        if(localStorage.getItem("user") == null) {
            
            return false;
        } else {
            
            return true;
        }
    }

    signinUser(userObj: User) {
        // const user = JSON.parse(localStorage.getItem("user")!);
        // if(user.username == userObj.name && user.password == userObj.password) {
        //     return true;
        // } else {
        //     return false;
        // }
        //const logginUser = new User(userObj.email)
        return this.http.post<AuthUser>("http://localhost:3000/api/auth/login", userObj);
    }

    signupUser(userObj: User) {
        return this.http.post<User>("http://localhost:3000/api/auth/register", userObj);
    }
    userLogout() {
            localStorage.removeItem("user");
    }
    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.isUserLogged());
            }, 800)
        })

        return promise;
    }
}

// export interface User {
//     name: string;
//     username: string;
//     password: string;
// }