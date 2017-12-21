/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { AulaDialogComponent } from '../../../../../../main/webapp/app/entities/aula/aula-dialog.component';
import { AulaService } from '../../../../../../main/webapp/app/entities/aula/aula.service';
import { Aula } from '../../../../../../main/webapp/app/entities/aula/aula.model';
import { TurmaService } from '../../../../../../main/webapp/app/entities/turma';
import { PeriodoLetivoService } from '../../../../../../main/webapp/app/entities/periodo-letivo';

describe('Component Tests', () => {

    describe('Aula Management Dialog Component', () => {
        let comp: AulaDialogComponent;
        let fixture: ComponentFixture<AulaDialogComponent>;
        let service: AulaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AulaDialogComponent],
                providers: [
                    TurmaService,
                    PeriodoLetivoService,
                    AulaService
                ]
            })
            .overrideTemplate(AulaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AulaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AulaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Aula(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.aula = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'aulaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Aula();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.aula = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'aulaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
