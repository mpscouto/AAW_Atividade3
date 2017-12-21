/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { DisciplinaDetailComponent } from '../../../../../../main/webapp/app/entities/disciplina/disciplina-detail.component';
import { DisciplinaService } from '../../../../../../main/webapp/app/entities/disciplina/disciplina.service';
import { Disciplina } from '../../../../../../main/webapp/app/entities/disciplina/disciplina.model';

describe('Component Tests', () => {

    describe('Disciplina Management Detail Component', () => {
        let comp: DisciplinaDetailComponent;
        let fixture: ComponentFixture<DisciplinaDetailComponent>;
        let service: DisciplinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [DisciplinaDetailComponent],
                providers: [
                    DisciplinaService
                ]
            })
            .overrideTemplate(DisciplinaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplinaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Disciplina(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.disciplina).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
