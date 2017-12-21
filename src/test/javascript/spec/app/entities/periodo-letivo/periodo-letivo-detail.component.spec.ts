/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { PeriodoLetivoDetailComponent } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo-detail.component';
import { PeriodoLetivoService } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.service';
import { PeriodoLetivo } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.model';

describe('Component Tests', () => {

    describe('PeriodoLetivo Management Detail Component', () => {
        let comp: PeriodoLetivoDetailComponent;
        let fixture: ComponentFixture<PeriodoLetivoDetailComponent>;
        let service: PeriodoLetivoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PeriodoLetivoDetailComponent],
                providers: [
                    PeriodoLetivoService
                ]
            })
            .overrideTemplate(PeriodoLetivoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PeriodoLetivoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodoLetivoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PeriodoLetivo(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.periodoLetivo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
