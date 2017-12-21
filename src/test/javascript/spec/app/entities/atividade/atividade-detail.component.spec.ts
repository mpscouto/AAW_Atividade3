/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { AtividadeDetailComponent } from '../../../../../../main/webapp/app/entities/atividade/atividade-detail.component';
import { AtividadeService } from '../../../../../../main/webapp/app/entities/atividade/atividade.service';
import { Atividade } from '../../../../../../main/webapp/app/entities/atividade/atividade.model';

describe('Component Tests', () => {

    describe('Atividade Management Detail Component', () => {
        let comp: AtividadeDetailComponent;
        let fixture: ComponentFixture<AtividadeDetailComponent>;
        let service: AtividadeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AtividadeDetailComponent],
                providers: [
                    AtividadeService
                ]
            })
            .overrideTemplate(AtividadeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtividadeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtividadeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Atividade(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.atividade).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
