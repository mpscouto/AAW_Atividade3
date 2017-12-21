import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Aula } from './aula.model';
import { AulaPopupService } from './aula-popup.service';
import { AulaService } from './aula.service';

@Component({
    selector: 'jhi-aula-delete-dialog',
    templateUrl: './aula-delete-dialog.component.html'
})
export class AulaDeleteDialogComponent {

    aula: Aula;

    constructor(
        private aulaService: AulaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aulaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'aulaListModification',
                content: 'Deleted an aula'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-aula-delete-popup',
    template: ''
})
export class AulaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aulaPopupService: AulaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.aulaPopupService
                .open(AulaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
