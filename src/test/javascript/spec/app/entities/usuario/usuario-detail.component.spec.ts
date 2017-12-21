/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AawAtividade3TestModule } from '../../../test.module';
import { UsuarioDetailComponent } from '../../../../../../main/webapp/app/entities/usuario/usuario-detail.component';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario/usuario.service';
import { Usuario } from '../../../../../../main/webapp/app/entities/usuario/usuario.model';

describe('Component Tests', () => {

    describe('Usuario Management Detail Component', () => {
        let comp: UsuarioDetailComponent;
        let fixture: ComponentFixture<UsuarioDetailComponent>;
        let service: UsuarioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AawAtividade3TestModule],
                declarations: [UsuarioDetailComponent],
                providers: [
                    UsuarioService
                ]
            })
            .overrideTemplate(UsuarioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Usuario(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.usuario).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
