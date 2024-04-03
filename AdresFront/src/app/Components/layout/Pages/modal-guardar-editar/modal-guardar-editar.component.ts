import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { Adquisicion } from 'src/app/Interfaces/adquisicion';
import { AdquisicionService } from 'src/app/Services/adquisicion.service';



export const MY_DATE_FORMATS = {
  parse:{ dateInput: 'DD/MM/YYYY' },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel:'MMMMM YYYY',
    dateA11Label:'LL',
    monthYearA11yLabel:'MMMMM YYYY'
  }

}

@Component({
  selector: 'app-modal-guardar-editar',
  templateUrl: './modal-guardar-editar.component.html',
  styleUrls: ['./modal-guardar-editar.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}

  ]
})
export class ModalGuardarEditarComponent implements OnInit {

  formAdquisicion: FormGroup;
  tituloAccion: string = "Nueva";
  botonAccion: string ="Guardar";

  constructor(
    private modalReferencia : MatDialogRef<ModalGuardarEditarComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _adquisicionService: AdquisicionService,
    @Inject(MAT_DIALOG_DATA) public dataAdquisicion: Adquisicion
  ) { 
    this.formAdquisicion = this.fb.group({
      id:['0'],
      presupuesto:['', Validators.required],
      unidad:['', Validators.required],
      bienServicio:['', Validators.required],
      cantidad:['', Validators.required],
      valorUnitario:['', Validators.required],
      valorTotal:['', Validators.required],
      fecha:['', Validators.required],
      proveedor:['', Validators.required],
      documentacion:['', Validators.required],
    })

  }
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  guardarEditarAdquisicion(){
    
    const modelo : Adquisicion = {
      id:this.formAdquisicion.value.id,
      presupuesto: this.formAdquisicion.value.presupuesto,
      unidadAdministrativa:this.formAdquisicion.value.unidad,
      bienesServicios:this.formAdquisicion.value.bienServicio,
      cantidad:this.formAdquisicion.value.cantidad,
      valorUnitario:this.formAdquisicion.value.valorUnitario,
      valorTotal:this.formAdquisicion.value.valorTotal,
      fechaAdquisicion: this.formAdquisicion.value.fecha,
      entidadProveedora:this.formAdquisicion.value.proveedor,
      documentacion:this.formAdquisicion.value.documentacion
    }

    if(this.dataAdquisicion==null){
      this._adquisicionService.add(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Se guardó correctamente.", "Exito")
          this.modalReferencia.close("creado")
        }, error:(e)=>{
          this.mostrarAlerta("Se presentó un error al guardar la adquisición.", "Error")
        }
      })
    }
    else{
      this._adquisicionService.update(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Se actualizó correctamente.", "Exito")
          this.modalReferencia.close("editado")
        }, error:(e)=>{
          this.mostrarAlerta("Se presentó un error al editar la adquisición.", "Error")
        }
      })
    }

  }

  ngOnInit(): void {
    if(this.dataAdquisicion){
      this.formAdquisicion.patchValue({
        id: this.dataAdquisicion.id,
        presupuesto: this.dataAdquisicion.presupuesto,
        unidad: this.dataAdquisicion.unidadAdministrativa,
        bienServicio: this.dataAdquisicion.bienesServicios,
        cantidad: this.dataAdquisicion.cantidad,
        valorUnitario: this.dataAdquisicion.valorUnitario,
        valorTotal: this.dataAdquisicion.valorTotal,
        fecha: this.dataAdquisicion.fechaAdquisicion,
        proveedor: this.dataAdquisicion.entidadProveedora,
        documentacion: this.dataAdquisicion.documentacion
      })

      this.tituloAccion="Editar";
      this.botonAccion="Guardar Cambios";
    }
  }

}
