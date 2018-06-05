import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AdminComponent } from './admin/admin.component';
import { GetRefseqStatusComponent } from './admin/get-refseq-status/get-refseq-status.component';
import {GetRefSeqService} from "./get-sorf/get-refseq.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { GetCodonComponent } from './get-codon/get-codon.component';
import {InterceptorService} from "./helper/interceptor.service";
import { GetSorfComponent } from './get-sorf/get-sorf.component';
import {GetSorfService} from "./get-sorf/get-sorf.service";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetCodonService} from "./get-codon/get-codon.service";
import {GetOrganismService} from "./get-organism.service";

const appRoutes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "admin", component: AdminComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GetRefseqStatusComponent,
    GetCodonComponent,
    GetSorfComponent,
    HomeComponent,

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),

    BrowserModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    GetRefSeqService,
    GetSorfService,
    GetCodonService,
    GetOrganismService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
