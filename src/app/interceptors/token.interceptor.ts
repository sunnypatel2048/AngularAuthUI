import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  const token = authService.getToken()
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req).pipe(
    catchError((err:any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          toastr.warning("Token is expired, Please Login again!", "WARNING")
          router.navigate(['login'])
        }
      }
      return throwError(() => err)
    })
  );
};
