import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Falta } from './falta.model';
import { FaltaService } from './falta.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-falta',
    templateUrl: './falta.component.html'
})
export class FaltaComponent implements OnInit, OnDestroy {
faltas: Falta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private faltaService: FaltaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.faltaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.faltas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFaltas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Falta) {
        return item.id;
    }
    registerChangeInFaltas() {
        this.eventSubscriber = this.eventManager.subscribe('faltaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
