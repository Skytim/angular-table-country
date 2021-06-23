import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from './components/modal/modal.component';
import { Country } from './model/country';
import { CountriesService } from './services/countries.service';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-component',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'flag',
    'name',
    'alpha2Code',
    'alpha3Code',
    'nativeName',
    'altSpellings',
    'callingCodes'
  ];
  searchName = '';
  countryData: Country[];
  dataSource: MatTableDataSource<Country>;
  txtQueryChanged: Subject<string> = new Subject<string>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    public countriesService: CountriesService
  ) {
    this.txtQueryChanged
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(model => {
        this.searchName = model;
        let filterData = this.countryData.filter(x => x.name.includes(model));
        this.setTable(filterData);
      });
  }

  ngOnInit() {
    this.countriesService.getService().subscribe((countries: Country[]) => {
      this.countryData = countries;
      this.setTable(countries);
    });
  }
  setTable(countries: Country[]) {
    this.dataSource = new MatTableDataSource<Country>(countries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(data: Country): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '70%',
      data: data
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {});
  }
  searchNameOnChange() {
    this.txtQueryChanged.next(this.searchName);
  }
}
