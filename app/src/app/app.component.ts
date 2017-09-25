import {Component, OnInit} from '@angular/core';
import {DataService} from "./service/data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) {
    this.length = this.data.length;
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {
      title: 'Name',
      name: 'name',
      // filtering: {filterString: '', placeholder: 'Filter by name'}
    },
    {
      title: 'IP Virtual',
      name: 'ipVirtual',
      // filtering: {filterString: '', placeholder: 'Filter by virtual IP'}
    },
    {
      title: 'IP Real',
      name: 'ipReal',
      // filtering: {filterString: '', placeholder: 'Filter by real IP'}
    },
    {
      title: 'Bytes Sent',
      name: 'bytesSent'
    },
    {
      title: 'Bytes Recveived',
      name: 'bytesReceived'
    },
    {
      title: 'Connected Since',
      name: 'connectedSince',
      // filtering: {filterString: '', placeholder: 'Filter by date of first connection'}
    },
    {
      title: 'Last Refresh',
      name: 'lastRefresh',
      // filtering: {filterString: '', placeholder: 'Filter by date of last refresh'}
    }
  ];
  public length: number = 0;

  public config: any = {
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table', 'table-condensed', 'table-striped', 'table-bordered']
  };

  private data: Array<any> = [];

  public ngOnInit(): void {
    this.reloadData();
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return (item[column.name] + '').match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = sortedData;
    this.length = sortedData.length;
  }

  public reloadData(): Subscription {
    return this.dataService.getVPNClients().subscribe(
      vpnClients => {
        this.data = vpnClients;
        this.length = this.data.length;
        this.onChangeTable(this.config);
      },
      err => {
        console.log(err);
      });
  }

}
