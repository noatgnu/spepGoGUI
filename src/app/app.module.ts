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
import { SearchSorfComponent } from './search-sorf/search-sorf.component';
import {GetBlastdbService} from "./get-blastdb.service";
import { QueryViewerComponent } from './search-sorf/query-viewer/query-viewer.component';
import { ResultViewerComponent } from './search-sorf/result-viewer/result-viewer.component';
import { AlignmentViewerComponent } from './alignment-viewer/alignment-viewer.component';
import {D3Service} from "d3-ng2-service";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { TblastxHitViewerComponent } from './tblastx-hit-viewer/tblastx-hit-viewer.component';
import { SequenceViewerComponent } from './sequence-viewer/sequence-viewer.component';

const appRoutes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "admin", component: AdminComponent},
  {path: "sorf", component: SearchSorfComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GetRefseqStatusComponent,
    GetCodonComponent,
    GetSorfComponent,
    HomeComponent,
    SearchSorfComponent,
    QueryViewerComponent,
    ResultViewerComponent,
    AlignmentViewerComponent,
    BarChartComponent,
    TblastxHitViewerComponent,
    SequenceViewerComponent,

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
    D3Service,
    GetRefSeqService,
    GetSorfService,
    GetCodonService,
    GetOrganismService,
    GetBlastdbService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
