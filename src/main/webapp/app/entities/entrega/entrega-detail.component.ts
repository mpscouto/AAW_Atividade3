import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Entrega } from './entrega.model';
import { EntregaService } from './entrega.service';

@Component({
    selector: 'jhi-entrega-detail',
    templateUrl: './entrega-detail.component.html'
})
export class EntregaDetailComponent implements OnInit, OnDestroy {

    entrega: Entrega;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entregaService: EntregaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntregas();
    }

    load(id) {
        this.entregaService.find(id).subscribe((entrega) => {
            this.entrega = entrega;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntregas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entregaListModification',
            (response) => this.load(this.entrega.id)
        );
    }
}
