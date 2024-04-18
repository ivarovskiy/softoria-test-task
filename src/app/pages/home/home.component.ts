import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/layouts/header/header.component';
import { MainComponent } from '../../shared/layouts/main/main.component';
import { FooterComponent } from '../../shared/layouts/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
