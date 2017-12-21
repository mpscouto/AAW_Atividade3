/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { AtividadeDialogComponent } from '../../../../../../main/webapp/app/entities/atividade/atividade-dialog.component';
import { AtividadeService } from '../../../../../../main/webapp/app/entities/atividade/atividade.service';
import { Atividade } from '../../../../../../main/webapp/app/entities/atividade/atividade.model';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor';
import { DisciplinaService } from '../../../../../../main/webapp/app/entities/disciplina';

describe('Component Tests', () => {

    describe('Atividade Management Dialog Component', () => {
        let comp: AtividadeDialogComponent;
        let fixture: ComponentFixture<AtividadeDialogComponent>;
        let service: AtividadeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AtividadeDialogComponent],
                providers: [
                    ProfessorService,
                    DisciplinaService,
                    AtividadeService
                ]
            })
            .overrideTemplate(AtividadeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtividadeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtividadeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Atividade(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.atividade = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'atividadeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Atividade();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.atividade = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'atividadeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
