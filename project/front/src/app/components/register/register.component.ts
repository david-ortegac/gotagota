import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/models/Register';
import { RegisterService } from 'src/app/services/register/register.service';
import Swal from 'sweetalert2'
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(8), Validators.max(16)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.min(8), Validators.max(16)]),
    });
  }

  async register() {
    const register: Register={
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      passowrd: this.registerForm.get('password')?.value,
      password_confirmation: this.registerForm.get('password_confirmation')?.value,
    }

    this.registerService.register(register).subscribe(res=>{
      console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Registrado, espera por autorización para ingreso!',
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(["/index"])
    });
  }

}
