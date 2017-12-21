import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PeriodoLetivo } from './periodo-letivo.model';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-periodo-letivo',
    templateUrl: './periodo-letivo.component.html'
})
export class PeriodoLetivoComponent implements OnInit, OnDestroy {
periodoLetivos: PeriodoLetivo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private periodoLetivoService: PeriodoLetivoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.periodoLetivoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.periodoLetivos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPeriodoLetivos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PeriodoLetivo) {
        return item.id;
    }
    registerChangeInPeriodoLetivos() {
        this.eventSubscriber = this.eventManager.subscribe('periodoLetivoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
