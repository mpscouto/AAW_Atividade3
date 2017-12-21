/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { ProfessorDetailComponent } from '../../../../../../main/webapp/app/entities/professor/professor-detail.component';
import { ProfessorService } from '../../../../../../main/webapp/app/entities/professor/professor.service';
import { Professor } from '../../../../../../main/webapp/app/entities/professor/professor.model';

describe('Component Tests', () => {

    describe('Professor Management Detail Component', () => {
        let comp: ProfessorDetailComponent;
        let fixture: ComponentFixture<ProfessorDetailComponent>;
        let service: ProfessorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [ProfessorDetailComponent],
                providers: [
                    ProfessorService
                ]
            })
            .overrideTemplate(ProfessorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Professor(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.professor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
