import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Permissao } from './permissao.model';
import { PermissaoService } from './permissao.service';

@Component({
    selector: 'jhi-permissao-detail',
    templateUrl: './permissao-detail.component.html'
})
export class PermissaoDetailComponent implements OnInit, OnDestroy {

    permissao: Permissao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private permissaoService: PermissaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPermissaos();
    }

    load(id) {
        this.permissaoService.find(id).subscribe((permissao) => {
            this.permissao = permissao;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPermissaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'permissaoListModification',
            (response) => this.load(this.permissao.id)
        );
    }
}
