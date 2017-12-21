/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { AlunoComponent } from '../../../../../../main/webapp/app/entities/aluno/aluno.component';
import { AlunoService } from '../../../../../../main/webapp/app/entities/aluno/aluno.service';
import { Aluno } from '../../../../../../main/webapp/app/entities/aluno/aluno.model';

describe('Component Tests', () => {

    describe('Aluno Management Component', () => {
        let comp: AlunoComponent;
        let fixture: ComponentFixture<AlunoComponent>;
        let service: AlunoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AlunoComponent],
                providers: [
                    AlunoService
                ]
            })
            .overrideTemplate(AlunoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlunoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlunoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Aluno(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alunos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
