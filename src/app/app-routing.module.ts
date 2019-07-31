import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardHolderComponent} from './components/card-holder/card-holder.component';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'card-holder', component: CardHolderComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule {

}
