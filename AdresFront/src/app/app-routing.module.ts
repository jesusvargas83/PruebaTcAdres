import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/layout/Pages/home/home.component';

const appRoutes: Routes = [
    {path:'', component:HomeComponent, pathMatch:"full"},
    {path:'pages', loadChildren: ()=> import("./Components/layout/layout.module").then(m => m.LayoutModule)},
    {path:'*', redirectTo:'home', pathMatch:"full"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}