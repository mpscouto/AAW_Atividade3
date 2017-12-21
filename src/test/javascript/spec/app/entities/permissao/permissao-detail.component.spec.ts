/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { PermissaoDetailComponent } from '../../../../../../main/webapp/app/entities/permissao/permissao-detail.component';
import { PermissaoService } from '../../../../../../main/webapp/app/entities/permissao/permissao.service';
import { Permissao } from '../../../../../../main/webapp/app/entities/permissao/permissao.model';

describe('Component Tests', () => {

    describe('Permissao Management Detail Component', () => {
        let comp: PermissaoDetailComponent;
        let fixture: ComponentFixture<PermissaoDetailComponent>;
        let service: PermissaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PermissaoDetailComponent],
                providers: [
                    PermissaoService
                ]
            })
            .overrideTemplate(PermissaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PermissaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermissaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Permissao(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.permissao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
