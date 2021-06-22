import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { Country } from './model/country';
import { PeriodicElement } from './model/periodic-element';
import { CountriesService } from './services/countries.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html'
})
export class TableBasicExample implements OnInit {
  displayedColumns: string[] = [
    'flag',
    'name',
    'alpha2Code',
    'alpha3Code',
    'nativeName',
    'altSpellings',
    'callingCodes'
  ];

  dataSource: Country[] = [];
  constructor(
    public dialog: MatDialog,
    public countriesService: CountriesService
  ) {}
  value: PeriodicElement;

  ngOnInit() {
    this.countriesService.getService().subscribe((countries: Country[]) => {
      // console.log(countries[0]);
      this.dataSource = countries;
    });
  }

  openDialog(data: PeriodicElement): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.value = result;
    });
  }
}
