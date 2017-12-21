/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { UsuarioDialogComponent } from '../../../../../../main/webapp/app/entities/usuario/usuario-dialog.component';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario/usuario.service';
import { Usuario } from '../../../../../../main/webapp/app/entities/usuario/usuario.model';
import { PermissaoService } from '../../../../../../main/webapp/app/entities/permissao';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor';

describe('Component Tests', () => {

    describe('Usuario Management Dialog Component', () => {
        let comp: UsuarioDialogComponent;
        let fixture: ComponentFixture<UsuarioDialogComponent>;
        let service: UsuarioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [UsuarioDialogComponent],
                providers: [
                    PermissaoService,
                    AlunoService,
                    ProfessorService,
                    UsuarioService
                ]
            })
            .overrideTemplate(UsuarioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Usuario(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.usuario = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'usuarioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Usuario();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.usuario = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'usuarioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
