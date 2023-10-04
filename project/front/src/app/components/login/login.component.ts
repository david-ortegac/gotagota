import { LoginService } from './../../services/login/login.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup

  constructor(private loginService: LoginService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(8)])
    })
  }

  login() {
    const email = this.form.get('email')?.value;
    const pass = this.form.get('password')?.value;

    this.loginService.login(email, pass).subscribe(res => {
      console.log(res);
    })
  }

}
