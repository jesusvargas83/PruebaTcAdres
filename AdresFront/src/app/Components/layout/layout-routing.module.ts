import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdquisicionesComponent } from './Pages/adquisiciones/adquisiciones.component';
import { HistorialComponent } from './Pages/historial/historial.component';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children:[
    {path:'adquisiciones', component:AdquisicionesComponent},
    {path:'historial', component:HistorialComponent},
    {path:'home', component:HomeComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
