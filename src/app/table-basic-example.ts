import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { Country } from './model/country';
import { PeriodicElement } from './model/periodic-element';
import { ELEMENT_DATA } from './model/periodic-element';
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(
    public dialog: MatDialog,
    public countriesService: CountriesService
  ) {}
  value: PeriodicElement;

  ngOnInit() {
    this.countriesService.getService().subscribe((countries: Country[]) => {
      console.log(countries[0]);
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

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
