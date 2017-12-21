/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { PermissaoDialogComponent } from '../../../../../../main/webapp/app/entities/permissao/permissao-dialog.component';
import { PermissaoService } from '../../../../../../main/webapp/app/entities/permissao/permissao.service';
import { Permissao } from '../../../../../../main/webapp/app/entities/permissao/permissao.model';

describe('Component Tests', () => {

    describe('Permissao Management Dialog Component', () => {
        let comp: PermissaoDialogComponent;
        let fixture: ComponentFixture<PermissaoDialogComponent>;
        let service: PermissaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PermissaoDialogComponent],
                providers: [
                    PermissaoService
                ]
            })
            .overrideTemplate(PermissaoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PermissaoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermissaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Permissao(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.permissao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'permissaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Permissao();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.permissao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'permissaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
