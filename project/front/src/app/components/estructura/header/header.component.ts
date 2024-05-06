import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LoginService} from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ProfileService} from "../../../services/profile/profile.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMenuOpenned: boolean = true;
  userName: string = "";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private readonly profileService: ProfileService,
    private logoutClient: LoginService,
    private router: Router,
  ) {
  }

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
    this.logoutClient.logout().subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesion finalizada!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/"])
    });
  }

  ngOnInit(): void {
    this.profileService.profile().subscribe(res => {
      this.userName = res.userData.name;
    })
  }

}
