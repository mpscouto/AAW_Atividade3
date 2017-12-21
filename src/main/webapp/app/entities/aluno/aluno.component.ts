import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aluno } from './aluno.model';
import { AlunoService } from './aluno.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-aluno',
    templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit, OnDestroy {
alunos: Aluno[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alunoService: AlunoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.alunoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.alunos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAlunos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Aluno) {
        return item.id;
    }
    registerChangeInAlunos() {
        this.eventSubscriber = this.eventManager.subscribe('alunoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
