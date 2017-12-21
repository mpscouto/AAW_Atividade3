/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { TurmaDialogComponent } from '../../../../../../main/webapp/app/entities/turma/turma-dialog.component';
import { TurmaService } from '../../../../../../main/webapp/app/entities/turma/turma.service';
import { Turma } from '../../../../../../main/webapp/app/entities/turma/turma.model';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor';

describe('Component Tests', () => {

    describe('Turma Management Dialog Component', () => {
        let comp: TurmaDialogComponent;
        let fixture: ComponentFixture<TurmaDialogComponent>;
        let service: TurmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [TurmaDialogComponent],
                providers: [
                    ProfessorService,
                    TurmaService
                ]
            })
            .overrideTemplate(TurmaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Turma(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.turma = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'turmaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Turma();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.turma = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'turmaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
