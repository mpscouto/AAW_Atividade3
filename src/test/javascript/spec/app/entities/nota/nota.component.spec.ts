/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { NotaComponent } from '../../../../../../main/webapp/app/entities/nota/nota.component';
import { NotaService } from '../../../../../../main/webapp/app/entities/nota/nota.service';
import { Nota } from '../../../../../../main/webapp/app/entities/nota/nota.model';

describe('Component Tests', () => {

    describe('Nota Management Component', () => {
        let comp: NotaComponent;
        let fixture: ComponentFixture<NotaComponent>;
        let service: NotaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [NotaComponent],
                providers: [
                    NotaService
                ]
            })
            .overrideTemplate(NotaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Nota(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
