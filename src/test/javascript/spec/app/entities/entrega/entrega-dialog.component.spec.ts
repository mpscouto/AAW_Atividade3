/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { EntregaDialogComponent } from '../../../../../../main/webapp/app/entities/entrega/entrega-dialog.component';
import { EntregaService } from '../../../../../../main/webapp/app/entities/entrega/entrega.service';
import { Entrega } from '../../../../../../main/webapp/app/entities/entrega/entrega.model';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno';
import { AtividadeService } from '../../../../../../main/webapp/app/entities/atividade';

describe('Component Tests', () => {

    describe('Entrega Management Dialog Component', () => {
        let comp: EntregaDialogComponent;
        let fixture: ComponentFixture<EntregaDialogComponent>;
        let service: EntregaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [EntregaDialogComponent],
                providers: [
                    AlunoService,
                    AtividadeService,
                    EntregaService
                ]
            })
            .overrideTemplate(EntregaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Entrega(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Entrega();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entrega = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entregaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
