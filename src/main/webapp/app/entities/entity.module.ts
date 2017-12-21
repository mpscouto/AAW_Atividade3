import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AawAtividade3PermissaoModule } from './permissao/permissao.module';
import { AawAtividade3UsuarioModule } from './usuario/usuario.module';
import { AawAtividade3AlunoModule } from './aluno/aluno.module';
import { AawAtividade3ProfessorModule } from './professor/professor.module';
import { AawAtividade3FaltaModule } from './falta/falta.module';
import { AawAtividade3NotaModule } from './nota/nota.module';
import { AawAtividade3TurmaModule } from './turma/turma.module';
import { AawAtividade3DisciplinaModule } from './disciplina/disciplina.module';
import { AawAtividade3AulaModule } from './aula/aula.module';
import { AawAtividade3AtividadeModule } from './atividade/atividade.module';
import { AawAtividade3PeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';
import { AawAtividade3EntregaModule } from './entrega/entrega.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AawAtividade3PermissaoModule,
        AawAtividade3UsuarioModule,
        AawAtividade3AlunoModule,
        AawAtividade3ProfessorModule,
        AawAtividade3FaltaModule,
        AawAtividade3NotaModule,
        AawAtividade3TurmaModule,
        AawAtividade3DisciplinaModule,
        AawAtividade3AulaModule,
        AawAtividade3AtividadeModule,
        AawAtividade3PeriodoLetivoModule,
        AawAtividade3EntregaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AawAtividade3EntityModule {}
