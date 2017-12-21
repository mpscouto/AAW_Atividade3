import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PeriodoLetivo } from './periodo-letivo.model';
import { PeriodoLetivoService } from './periodo-letivo.service';

@Component({
    selector: 'jhi-periodo-letivo-detail',
    templateUrl: './periodo-letivo-detail.component.html'
})
export class PeriodoLetivoDetailComponent implements OnInit, OnDestroy {

    periodoLetivo: PeriodoLetivo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private periodoLetivoService: PeriodoLetivoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPeriodoLetivos();
    }

    load(id) {
        this.periodoLetivoService.find(id).subscribe((periodoLetivo) => {
            this.periodoLetivo = periodoLetivo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPeriodoLetivos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'periodoLetivoListModification',
            (response) => this.load(this.periodoLetivo.id)
        );
    }
}
