import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Aula } from './aula.model';
import { AulaService } from './aula.service';

@Component({
    selector: 'jhi-aula-detail',
    templateUrl: './aula-detail.component.html'
})
export class AulaDetailComponent implements OnInit, OnDestroy {

    aula: Aula;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private aulaService: AulaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAulas();
    }

    load(id) {
        this.aulaService.find(id).subscribe((aula) => {
            this.aula = aula;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAulas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'aulaListModification',
            (response) => this.load(this.aula.id)
        );
    }
}
