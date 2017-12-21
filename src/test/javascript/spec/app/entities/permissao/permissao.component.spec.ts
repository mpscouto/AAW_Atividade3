/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AawAtividade3TestModule } from '../../../test.module';
import { PermissaoComponent } from '../../../../../../main/webapp/app/entities/permissao/permissao.component';
import { PermissaoService } from '../../../../../../main/webapp/app/entities/permissao/permissao.service';
import { Permissao } from '../../../../../../main/webapp/app/entities/permissao/permissao.model';

describe('Component Tests', () => {

    describe('Permissao Management Component', () => {
        let comp: PermissaoComponent;
        let fixture: ComponentFixture<PermissaoComponent>;
        let service: PermissaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [PermissaoComponent],
                providers: [
                    PermissaoService
                ]
            })
            .overrideTemplate(PermissaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PermissaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermissaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Permissao(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.permissaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
