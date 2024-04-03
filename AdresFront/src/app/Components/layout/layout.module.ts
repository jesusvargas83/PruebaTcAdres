import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AdquisicionesComponent } from './Pages/adquisiciones/adquisiciones.component';
import { HistorialComponent } from './Pages/historial/historial.component';
import { HomeComponent } from './Pages/home/home.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AdquisicionesComponent,
    HistorialComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MatSidenavModule
  ]
})
export class LayoutModule { }
