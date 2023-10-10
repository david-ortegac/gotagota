import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { decrypt } from 'src/app/utils/util-encrypt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpenned: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private httpCient: HttpClient,
    private logoutClient: LoginService,
    private router: Router,
  ) { }

  showMenu() {
    if (this.isMenuOpenned) {
      this.renderer.addClass(this.document.body, 'toggle-sidebar');
      this.isMenuOpenned = false;
    } else {
      this.isMenuOpenned = true;
      this.renderer.removeClass(this.document.body, 'toggle-sidebar');
    }
    
  }

  async logout() {
    this.logoutClient.logout().subscribe(res => {
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesion finalizada!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/"])
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

}
