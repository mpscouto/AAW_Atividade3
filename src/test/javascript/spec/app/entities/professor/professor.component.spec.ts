/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { ProfessorComponent } from '../../../../../../main/webapp/app/entities/professor/professor.component';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor/professor.service';
import { Professor } from '../../../../../../main/webapp/app/entities/professor/professor.model';

describe('Component Tests', () => {

    describe('Professor Management Component', () => {
        let comp: ProfessorComponent;
        let fixture: ComponentFixture<ProfessorComponent>;
        let service: ProfessorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [ProfessorComponent],
                providers: [
                    ProfessorService
                ]
            })
            .overrideTemplate(ProfessorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Professor(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.professors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
