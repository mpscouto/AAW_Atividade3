/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { AulaComponent } from '../../../../../../main/webapp/app/entities/aula/aula.component';
import { AulaService } from '../../../../../../main/webapp/app/entities/aula/aula.service';
import { Aula } from '../../../../../../main/webapp/app/entities/aula/aula.model';

describe('Component Tests', () => {

    describe('Aula Management Component', () => {
        let comp: AulaComponent;
        let fixture: ComponentFixture<AulaComponent>;
        let service: AulaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AulaComponent],
                providers: [
                    AulaService
                ]
            })
            .overrideTemplate(AulaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AulaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AulaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Aula(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.aulas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
