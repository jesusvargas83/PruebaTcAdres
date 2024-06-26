import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AdquisicionService } from 'src/app/Services/adquisicion.service';
import { MatSnackBar }  from '@angular/material/snack-bar';
import { Adquisicion } from 'src/app/Interfaces/adquisicion';
import { MatDialog } from '@angular/material/dialog';
import { ModalGuardarEditarComponent } from 'src/app/Components/layout/Pages/modal-guardar-editar/modal-guardar-editar.component'//'src/app/Pages/modal-guardar-editar/modal-guardar-editar.component';
import { ModalEliminarComponent } from 'src/app/Components/layout/Pages/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-adquisiciones',
  templateUrl: './adquisiciones.component.html',
  styleUrls: ['./adquisiciones.component.css']
})
export class AdquisicionesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Presupuesto', 'Unidad', 'BienServicio', 'Cantidad', 'ValorUnitario', 'ValorTotal', 'Fecha', 'Proveedor', 'Documentacion', 'Acciones'];
  dataSource = new MatTableDataSource<Adquisicion>();

  constructor(
    private _adquisicionService: AdquisicionService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerAdquisiciones();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerAdquisiciones(){
    this._adquisicionService.getList().subscribe({ next:(dataResponse)=>{

      console.log(dataResponse);
      this.dataSource.data = dataResponse;
    }, error:(e)=>{}
    })
  }

  modalNuevaAdquisicion() {
    this.dialog.open(ModalGuardarEditarComponent,{
      disableClose:true,
      width:"500px"
    }).afterClosed().subscribe(resultado=>{
      if(resultado == "creado"){
        this.obtenerAdquisiciones();
      }
    });
  }

  modalEditarAdquisicion(dataAdquisicion:Adquisicion) {
    this.dialog.open(ModalGuardarEditarComponent,{
      disableClose:true,
      width:"500px",
      data:dataAdquisicion
    }).afterClosed().subscribe(resultado=>{
      if(resultado == "editado"){
        this.obtenerAdquisiciones();
      }
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  modalEliminarAdquisicion(dataAdquisicion: Adquisicion){
    this.dialog.open(ModalEliminarComponent,{
      disableClose:true,
      data:dataAdquisicion
    }).afterClosed().subscribe(resultado=>{
      if(resultado == "Eliminar"){
        this._adquisicionService.delete(dataAdquisicion.id!).subscribe({

          next:(data)=>{
            this.mostrarAlerta("La Adquisición fue eliminada.","Exito")
            this.obtenerAdquisiciones();
          },error:(e)=>{
            console.log(e);
          }
        })
      }
    });
  }
}
