/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { EntregaDetailComponent } from '../../../../../../main/webapp/app/entities/entrega/entrega-detail.component';
import { EntregaService } from '../../../../../../main/webapp/app/entities/entrega/entrega.service';
import { Entrega } from '../../../../../../main/webapp/app/entities/entrega/entrega.model';

describe('Component Tests', () => {

    describe('Entrega Management Detail Component', () => {
        let comp: EntregaDetailComponent;
        let fixture: ComponentFixture<EntregaDetailComponent>;
        let service: EntregaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [EntregaDetailComponent],
                providers: [
                    EntregaService
                ]
            })
            .overrideTemplate(EntregaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntregaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntregaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Entrega(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entrega).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
