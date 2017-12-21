/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { ProfessorDialogComponent } from '../../../../../../main/webapp/app/entities/professor/professor-dialog.component';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor/professor.service';
import { Professor } from '../../../../../../main/webapp/app/entities/professor/professor.model';
import { DisciplinaService } from '../../../../../../main/webapp/app/entities/disciplina';

describe('Component Tests', () => {

    describe('Professor Management Dialog Component', () => {
        let comp: ProfessorDialogComponent;
        let fixture: ComponentFixture<ProfessorDialogComponent>;
        let service: ProfessorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [ProfessorDialogComponent],
                providers: [
                    DisciplinaService,
                    ProfessorService
                ]
            })
            .overrideTemplate(ProfessorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Professor(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.professor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'professorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Professor();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.professor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'professorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
