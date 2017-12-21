/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { AlunoDetailComponent } from '../../../../../../main/webapp/app/entities/aluno/aluno-detail.component';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno/aluno.service';
import { Aluno } from '../../../../../../main/webapp/app/entities/aluno/aluno.model';

describe('Component Tests', () => {

    describe('Aluno Management Detail Component', () => {
        let comp: AlunoDetailComponent;
        let fixture: ComponentFixture<AlunoDetailComponent>;
        let service: AlunoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AlunoDetailComponent],
                providers: [
                    AlunoService
                ]
            })
            .overrideTemplate(AlunoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlunoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlunoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Aluno(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.aluno).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
