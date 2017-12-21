/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { DisciplinaDialogComponent } from '../../../../../../main/webapp/app/entities/disciplina/disciplina-dialog.component';
import { DisciplinaService } from '../../../../../../main/webapp/app/entities/disciplina/disciplina.service';
import { Disciplina } from '../../../../../../main/webapp/app/entities/disciplina/disciplina.model';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor';

describe('Component Tests', () => {

    describe('Disciplina Management Dialog Component', () => {
        let comp: DisciplinaDialogComponent;
        let fixture: ComponentFixture<DisciplinaDialogComponent>;
        let service: DisciplinaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [DisciplinaDialogComponent],
                providers: [
                    ProfessorService,
                    DisciplinaService
                ]
            })
            .overrideTemplate(DisciplinaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplinaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplinaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Disciplina(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.disciplina = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'disciplinaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Disciplina();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.disciplina = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'disciplinaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
