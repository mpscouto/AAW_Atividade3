import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Permissao } from './permissao.model';
import { PermissaoService } from './permissao.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-permissao',
    templateUrl: './permissao.component.html'
})
export class PermissaoComponent implements OnInit, OnDestroy {
permissaos: Permissao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private permissaoService: PermissaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.permissaoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.permissaos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPermissaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Permissao) {
        return item.id;
    }
    registerChangeInPermissaos() {
        this.eventSubscriber = this.eventManager.subscribe('permissaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
