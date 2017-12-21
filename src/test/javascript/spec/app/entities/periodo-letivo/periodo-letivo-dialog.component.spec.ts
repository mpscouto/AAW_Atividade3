/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { PeriodoLetivoDialogComponent } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo-dialog.component';
import { PeriodoLetivoService } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.service';
import { PeriodoLetivo } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.model';

describe('Component Tests', () => {

    describe('PeriodoLetivo Management Dialog Component', () => {
        let comp: PeriodoLetivoDialogComponent;
        let fixture: ComponentFixture<PeriodoLetivoDialogComponent>;
        let service: PeriodoLetivoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PeriodoLetivoDialogComponent],
                providers: [
                    PeriodoLetivoService
                ]
            })
            .overrideTemplate(PeriodoLetivoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PeriodoLetivoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodoLetivoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PeriodoLetivo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.periodoLetivo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'periodoLetivoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PeriodoLetivo();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.periodoLetivo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'periodoLetivoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
