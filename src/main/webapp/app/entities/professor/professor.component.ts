import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Professor } from './professor.model';
import { ProfessorService } from './professor.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-professor',
    templateUrl: './professor.component.html'
})
export class ProfessorComponent implements OnInit, OnDestroy {
professors: Professor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private professorService: ProfessorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.professorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.professors = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProfessors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Professor) {
        return item.id;
    }
    registerChangeInProfessors() {
        this.eventSubscriber = this.eventManager.subscribe('professorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
