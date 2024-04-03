export interface Adquisicion {
    id?:number,
    presupuesto:number,
    unidadAdministrativa:string,
    bienesServicios:string,
    cantidad:number,
    valorUnitario:number,
    valorTotal:number,
    fechaAdquisicion:Date,
    entidadProveedora:string,
    documentacion:string
}
