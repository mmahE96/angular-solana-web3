import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HdWalletAdapterModule } from '@heavy-duty/wallet-adapter';

import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { RPCComponent } from './pages/rpc/rpc.component';
import { WalletsComponent } from './pages/connection/wallets/wallets.component';
import { AirdropComponent } from './pages/transactions/airdrop/airdrop.component';
import { ConnectionService } from './connection.service';

const appRoutes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'connection', component:ConnectionComponent},
  {path: 'programs', component:ProgramsComponent},
  {path: 'rpc', component:RPCComponent},
  {path: 'transactions', component:TransactionsComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ConnectionComponent,
    TransactionsComponent,
    ProgramsComponent,
    RPCComponent,
    WalletsComponent,
    AirdropComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    FormsModule,
    HdWalletAdapterModule.forRoot({ autoConnect: true })
  ],
  exports:[RouterModule],
  providers: [ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
export const routingComponents = [HomeComponent, 
  AboutComponent,
  ConnectionComponent,
  TransactionsComponent,
  ProgramsComponent,
  RPCComponent]
