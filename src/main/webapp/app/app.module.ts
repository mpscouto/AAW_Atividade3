import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AawAtividade3SharedModule, UserRouteAccessService } from './shared';
import { AawAtividade3AppRoutingModule} from './app-routing.module';
import { AawAtividade3HomeModule } from './home/home.module';
import { AawAtividade3AdminModule } from './admin/admin.module';
import { AawAtividade3AccountModule } from './account/account.module';
import { AawAtividade3EntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        AawAtividade3AppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        AawAtividade3SharedModule,
        AawAtividade3HomeModule,
        AawAtividade3AdminModule,
        AawAtividade3AccountModule,
        AawAtividade3EntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class AawAtividade3AppModule {}
