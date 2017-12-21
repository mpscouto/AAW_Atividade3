/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { PeriodoLetivoComponent } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.component';
import { PeriodoLetivoService } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.service';
import { PeriodoLetivo } from '../../../../../../main/webapp/app/entities/periodo-letivo/periodo-letivo.model';

describe('Component Tests', () => {

    describe('PeriodoLetivo Management Component', () => {
        let comp: PeriodoLetivoComponent;
        let fixture: ComponentFixture<PeriodoLetivoComponent>;
        let service: PeriodoLetivoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PeriodoLetivoComponent],
                providers: [
                    PeriodoLetivoService
                ]
            })
            .overrideTemplate(PeriodoLetivoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PeriodoLetivoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PeriodoLetivoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PeriodoLetivo(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.periodoLetivos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
