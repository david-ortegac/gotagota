import { User } from 'src/app/models/User';
import { Login } from './../../models/Login';
import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import Swal from 'sweetalert2'
import { encrypt } from 'src/app/utils/util-encrypt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  user!: User;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(8)])
    })
  }

  ngOnInit() {
    this.profileService.profile().subscribe(res => {
      if (res.userData?.id != null) {
        this.router.navigate(["/index"]);
      }
    })
  }

  async login() {
    const login: Login = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };

    this.loginService.login(login).subscribe(res => {
      this.user = res;
      console.log(res.token);
      sessionStorage.setItem('tk', encrypt(res.token!))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario autorizado!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/index"])
    }, (error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    }));
  }

}
