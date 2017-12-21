import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aula } from './aula.model';
import { AulaService } from './aula.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-aula',
    templateUrl: './aula.component.html'
})
export class AulaComponent implements OnInit, OnDestroy {
aulas: Aula[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private aulaService: AulaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.aulaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.aulas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAulas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Aula) {
        return item.id;
    }
    registerChangeInAulas() {
        this.eventSubscriber = this.eventManager.subscribe('aulaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
