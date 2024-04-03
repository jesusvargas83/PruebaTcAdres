import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { AdquisicionService } from 'src/app/Services/adquisicion.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Historial } from 'src/app/Interfaces/historial';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { map } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['IdAdquisicion','Tipo','Fecha','Presupuesto','Unidad','BienServicio','Cantidad','ValorUnitario','ValorTotal','Proveedor','Documentacion'];
  dataSource = new MatTableDataSource<any>();

  constructor( private _adquisicionService: AdquisicionService, ) { }

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerHistorial(){
    this._adquisicionService.getHistorial()
    .pipe(map((dataResponse)=>{
      dataResponse.response.forEach((item)=>{
        item.descripcion = JSON.parse(item.descripcion)
      });
      return dataResponse;
    }))
    .subscribe({ next:(dataResponse)=>{
      this.dataSource.data = dataResponse.response;
    }, error:(e)=>{}
    })
  }

}
