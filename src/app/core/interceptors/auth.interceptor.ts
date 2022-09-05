import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { SessionsService } from '../services/sessions.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private sessionsService: SessionsService, private authService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        //const account = this.authService.authenticatedUser;
        const authtoken = this.sessionsService.getAuthToken();
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (authtoken && isApiUrl) {
            request = request.clone({
                setHeaders: { 'x-access-token': `${authtoken}`, }
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMsg = '';
            //   if (error.error instanceof ErrorEvent) {
            //     console.log('this is client side error');
            //     console.log(error.status);
            //     errorMsg = `Error: ${error.error.message}`;
                if(error.status == 401) {
                    this.authService.userLogout();
                    this.router.navigate(['']);
                }
            //   }
            //   else {
            //     console.log('this is server side error');
            //     errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            //   }
            //   console.log(errorMsg);
              return throwError(errorMsg);
            })
          );
    }
}