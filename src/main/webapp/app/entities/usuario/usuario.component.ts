import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usuario',
    templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {
usuarios: Usuario[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private usuarioService: UsuarioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.usuarioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.usuarios = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Usuario) {
        return item.id;
    }
    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
