/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { AulaDetailComponent } from '../../../../../../main/webapp/app/entities/aula/aula-detail.component';
import { AulaService } from '../../../../../../main/webapp/app/entities/aula/aula.service';
import { Aula } from '../../../../../../main/webapp/app/entities/aula/aula.model';

describe('Component Tests', () => {

    describe('Aula Management Detail Component', () => {
        let comp: AulaDetailComponent;
        let fixture: ComponentFixture<AulaDetailComponent>;
        let service: AulaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AulaDetailComponent],
                providers: [
                    AulaService
                ]
            })
            .overrideTemplate(AulaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AulaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AulaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Aula(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.aula).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
