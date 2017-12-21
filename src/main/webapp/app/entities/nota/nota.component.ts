import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Nota } from './nota.model';
import { NotaService } from './nota.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-nota',
    templateUrl: './nota.component.html'
})
export class NotaComponent implements OnInit, OnDestroy {
notas: Nota[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notaService: NotaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.notaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.notas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Nota) {
        return item.id;
    }
    registerChangeInNotas() {
        this.eventSubscriber = this.eventManager.subscribe('notaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
