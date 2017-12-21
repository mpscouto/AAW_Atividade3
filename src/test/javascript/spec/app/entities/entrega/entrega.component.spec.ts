/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { EntregaComponent } from '../../../../../../main/webapp/app/entities/entrega/entrega.component';
import { EntregaService } from '../../../../../../main/webapp/app/entities/entrega/entrega.service';
import { Entrega } from '../../../../../../main/webapp/app/entities/entrega/entrega.model';

describe('Component Tests', () => {

    describe('Entrega Management Component', () => {
        let comp: EntregaComponent;
        let fixture: ComponentFixture<EntregaComponent>;
        let service: EntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [EntregaComponent],
                providers: [
                    EntregaService
                ]
            })
            .overrideTemplate(EntregaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Entrega(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entregas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
