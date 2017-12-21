/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { NotaDetailComponent } from '../../../../../../main/webapp/app/entities/nota/nota-detail.component';
import { NotaService } from '../../../../../../main/webapp/app/entities/nota/nota.service';
import { Nota } from '../../../../../../main/webapp/app/entities/nota/nota.model';

describe('Component Tests', () => {

    describe('Nota Management Detail Component', () => {
        let comp: NotaDetailComponent;
        let fixture: ComponentFixture<NotaDetailComponent>;
        let service: NotaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [NotaDetailComponent],
                providers: [
                    NotaService
                ]
            })
            .overrideTemplate(NotaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Nota(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nota).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
