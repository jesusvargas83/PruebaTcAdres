import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Adquisicion } from 'src/app/Interfaces/adquisicion';


@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  constructor(
    private modalReferencia : MatDialogRef<ModalEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAdquisicion: Adquisicion
  ) { }

  ngOnInit(): void {
  }

  confirmarEliminacion(){
    if(this.dataAdquisicion){
      this.modalReferencia.close("Eliminar")
    }
  }

}
