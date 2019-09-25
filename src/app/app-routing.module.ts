import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrayComponent } from './array/array.component';
import { DictComponent } from './dict/dict.component';


const routes: Routes = [
  { path: '' , redirectTo: '/array', pathMatch: 'full'},
  { path: 'array', component: ArrayComponent },
  { path: 'dict', component: DictComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
