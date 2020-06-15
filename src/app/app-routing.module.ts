import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonersComponent } from './summoners/summoners.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path:'',
    component: HeaderComponent,
    children: [
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'summoners/:summonerName',
        component: SummonersComponent
      },
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
