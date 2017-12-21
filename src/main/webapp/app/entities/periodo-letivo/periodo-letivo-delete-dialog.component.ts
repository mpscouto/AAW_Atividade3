import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PeriodoLetivo } from './periodo-letivo.model';
import { PeriodoLetivoPopupService } from './periodo-letivo-popup.service';
import { PeriodoLetivoService } from './periodo-letivo.service';

@Component({
    selector: 'jhi-periodo-letivo-delete-dialog',
    templateUrl: './periodo-letivo-delete-dialog.component.html'
})
export class PeriodoLetivoDeleteDialogComponent {

    periodoLetivo: PeriodoLetivo;

    constructor(
        private periodoLetivoService: PeriodoLetivoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.periodoLetivoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'periodoLetivoListModification',
                content: 'Deleted an periodoLetivo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-periodo-letivo-delete-popup',
    template: ''
})
export class PeriodoLetivoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private periodoLetivoPopupService: PeriodoLetivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.periodoLetivoPopupService
                .open(PeriodoLetivoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
