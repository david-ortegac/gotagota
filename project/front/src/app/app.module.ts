import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/clients/create/create.component';
import { EditComponent } from './components/clients/edit/edit.component';
import { IndexComponent } from './components/clients/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/estructura/sidebar/sidebar.component';
import { HeroComponent } from './components/estructura/hero/hero.component';
import { FooterComponent } from './components/estructura/footer/footer.component';
import { HeaderComponent } from './components/estructura/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    IndexComponent,
    RegisterComponent,
    SidebarComponent,
    HeroComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
