import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Atividade } from './atividade.model';
import { AtividadeService } from './atividade.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-atividade',
    templateUrl: './atividade.component.html'
})
export class AtividadeComponent implements OnInit, OnDestroy {
atividades: Atividade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private atividadeService: AtividadeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.atividadeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.atividades = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtividades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Atividade) {
        return item.id;
    }
    registerChangeInAtividades() {
        this.eventSubscriber = this.eventManager.subscribe('atividadeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
