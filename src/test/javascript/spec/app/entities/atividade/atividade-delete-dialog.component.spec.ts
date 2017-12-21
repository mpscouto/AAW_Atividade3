/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AawAtividade3TestModule } from '../../../test.module';
import { AtividadeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/atividade/atividade-delete-dialog.component';
import { AtividadeService } from '../../../../../../main/webapp/app/entities/atividade/atividade.service';

describe('Component Tests', () => {

    describe('Atividade Management Delete Component', () => {
        let comp: AtividadeDeleteDialogComponent;
        let fixture: ComponentFixture<AtividadeDeleteDialogComponent>;
        let service: AtividadeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AtividadeDeleteDialogComponent],
                providers: [
                    AtividadeService
                ]
            })
            .overrideTemplate(AtividadeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtividadeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtividadeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
