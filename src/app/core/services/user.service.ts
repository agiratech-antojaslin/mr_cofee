import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from "../modals/user.modal";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getClients() {
    return this.http.get("http://localhost:3000/api/getAll");
    // .pipe(map((responseData: { [key: string] : any }) => {
    //     const postData: User [] = [];
    //     for(const key in responseData) {
    //         if(responseData.hasOwnProperty(key)) {
    //             postData.push({ ...responseData[key], key: key});
    //             //this.questions.push(responseData[key]);
    //         }
    //     }
    //     return postData;
    // }));
    // .subscribe(posts => {
        
    //     console.log(posts);
    // });
  }
}

// export interface User {
//     name: string;
//     email: string;
//     password: string;
// }