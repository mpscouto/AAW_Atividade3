/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { PeriodoLetivoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo-delete-dialog.component';
import { PeriodoLetivoService } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.service';

describe('Component Tests', () => {

    describe('PeriodoLetivo Management Delete Component', () => {
        let comp: PeriodoLetivoDeleteDialogComponent;
        let fixture: ComponentFixture<PeriodoLetivoDeleteDialogComponent>;
        let service: PeriodoLetivoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PeriodoLetivoDeleteDialogComponent],
                providers: [
                    PeriodoLetivoService
                ]
            })
            .overrideTemplate(PeriodoLetivoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PeriodoLetivoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodoLetivoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
