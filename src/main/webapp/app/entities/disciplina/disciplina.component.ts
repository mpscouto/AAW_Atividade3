import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Disciplina } from './disciplina.model';
import { DisciplinaService } from './disciplina.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-disciplina',
    templateUrl: './disciplina.component.html'
})
export class DisciplinaComponent implements OnInit, OnDestroy {
disciplinas: Disciplina[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private disciplinaService: DisciplinaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.disciplinaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.disciplinas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDisciplinas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Disciplina) {
        return item.id;
    }
    registerChangeInDisciplinas() {
        this.eventSubscriber = this.eventManager.subscribe('disciplinaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
