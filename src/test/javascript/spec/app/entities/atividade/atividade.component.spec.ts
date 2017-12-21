/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { AtividadeComponent } from '../../../../../../main/webapp/app/entities/atividade/atividade.component';
import { AtividadeService } from '../../../../../../main/webapp/app/entities/atividade/atividade.service';
import { Atividade } from '../../../../../../main/webapp/app/entities/atividade/atividade.model';

describe('Component Tests', () => {

    describe('Atividade Management Component', () => {
        let comp: AtividadeComponent;
        let fixture: ComponentFixture<AtividadeComponent>;
        let service: AtividadeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [AtividadeComponent],
                providers: [
                    AtividadeService
                ]
            })
            .overrideTemplate(AtividadeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtividadeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtividadeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Atividade(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.atividades[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
