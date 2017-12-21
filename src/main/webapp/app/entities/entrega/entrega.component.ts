import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entrega } from './entrega.model';
import { EntregaService } from './entrega.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entrega',
    templateUrl: './entrega.component.html'
})
export class EntregaComponent implements OnInit, OnDestroy {
entregas: Entrega[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entregaService: EntregaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entregaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entregas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntregas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Entrega) {
        return item.id;
    }
    registerChangeInEntregas() {
        this.eventSubscriber = this.eventManager.subscribe('entregaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
