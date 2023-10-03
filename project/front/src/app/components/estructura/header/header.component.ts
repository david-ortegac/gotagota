import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpenned: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
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

}
