/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { FaltaDialogComponent } from '../../../../../../main/webapp/app/entities/falta/falta-dialog.component';
import { FaltaService } from '../../../../../../main/webapp/app/entities/falta/falta.service';
import { Falta } from '../../../../../../main/webapp/app/entities/falta/falta.model';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno';
import { AulaService } from '../../../../../../main/webapp/app/entities/aula';
import { PeriodoLetivoService } from '../../../../../../main/webapp/app/entities/periodo-letivo';

describe('Component Tests', () => {

    describe('Falta Management Dialog Component', () => {
        let comp: FaltaDialogComponent;
        let fixture: ComponentFixture<FaltaDialogComponent>;
        let service: FaltaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [FaltaDialogComponent],
                providers: [
                    AlunoService,
                    AulaService,
                    PeriodoLetivoService,
                    FaltaService
                ]
            })
            .overrideTemplate(FaltaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaltaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaltaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Falta(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.falta = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'faltaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Falta();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.falta = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'faltaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
