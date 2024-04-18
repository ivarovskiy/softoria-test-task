import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SearchFieldComponent } from '../../components/search-field/search-field.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, SearchFieldComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
