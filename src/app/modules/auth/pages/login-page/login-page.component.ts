import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  errorSession: boolean = false;

  constructor(private authService: AuthService, private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.formLogin = new FormGroup (
        {
          email: new FormControl('', [
            Validators.required,
            Validators.email
          ]),
          password: new FormControl('',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(12)
            ])
        }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value
    this.authService.sendCredentials(email, password)
      .subscribe(responseOk => {
        console.log('Session iniciada correcta', responseOk);
        const { tokenSession, data } = responseOk
        this.cookie.set('token', tokenSession, 4, '/')
        this.router.navigate(['/', 'tracks'])
      },
        err => {
          this.errorSession = true
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password', err);
        })

  }
}
