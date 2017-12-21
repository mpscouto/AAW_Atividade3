/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { NotaDialogComponent } from '../../../../../../main/webapp/app/entities/nota/nota-dialog.component';
import { NotaService } from '../../../../../../main/webapp/app/entities/nota/nota.service';
import { Nota } from '../../../../../../main/webapp/app/entities/nota/nota.model';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno';
import { AtividadeService } from '../../../../../../main/webapp/app/entities/atividade';

describe('Component Tests', () => {

    describe('Nota Management Dialog Component', () => {
        let comp: NotaDialogComponent;
        let fixture: ComponentFixture<NotaDialogComponent>;
        let service: NotaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [NotaDialogComponent],
                providers: [
                    AlunoService,
                    AtividadeService,
                    NotaService
                ]
            })
            .overrideTemplate(NotaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Nota(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.nota = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'notaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Nota();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.nota = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'notaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
