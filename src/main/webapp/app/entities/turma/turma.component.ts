import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Turma } from './turma.model';
import { TurmaService } from './turma.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-turma',
    templateUrl: './turma.component.html'
})
export class TurmaComponent implements OnInit, OnDestroy {
turmas: Turma[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private turmaService: TurmaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.turmaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.turmas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTurmas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Turma) {
        return item.id;
    }
    registerChangeInTurmas() {
        this.eventSubscriber = this.eventManager.subscribe('turmaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
