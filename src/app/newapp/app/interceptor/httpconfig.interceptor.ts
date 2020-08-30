import { Injectable } from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {EncrDecrService} from '@shared/services/encr-decr.service';
import Swal from 'sweetalert2';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

        constructor(
         private EncrDecr: EncrDecrService
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string =this.EncrDecr.get(localStorage.getItem('ACCESS_TOKEN'));
        
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('x-request-id', '123') });
        
        return next.handle(request).pipe(catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 400) {
                        Swal.fire('Oops...', err.error.message, 'error');
                        return throwError(err.message);
                    }

                    if (err.status === 404) {
                        Swal.fire('Oops...', err.error.message, 'error');
                        return throwError(err.message);
                    }

                    if (err.status === 500) {
                        Swal.fire('Oops...', err.error.message, 'error');
                        return throwError(err.message);
                    }
                }
            }));
    }

}

