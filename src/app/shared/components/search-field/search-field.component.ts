import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteSearchService } from '@services/http/autocomplete-search.service';
import { ICity } from '@models/city.interface';
import { CityService } from '@services/local/city.service';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnInit {
  autocompleteSearchService = inject(AutocompleteSearchService);
  cityService = inject(CityService);

  control = new FormControl('');

  filteredCities!: Observable<ICity[]>;

  ngOnInit() {
    this.filteredCities = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(q => this.autocompleteSearchService.getAutocompleteResults(q))
    );
  }

  displayCityFn(city: ICity): string {
    return city && city.LocalizedName
      ? `${city.LocalizedName}, ${city.Country.ID}`
      : '';
  }

  handleSelectedCity(key: string, name: string, id: string) {
    this.cityService.setCityKey(key);
    this.cityService.setCityLocalizedName(`${name}, ${id}`);
  }
}
