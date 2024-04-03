export interface Historial {
    mensaje:string,
    response:[{
        id:number,
        idAdquisicion:number,
        tipo:string,
        fecha:Date,
        descripcion:string
    }]
}
