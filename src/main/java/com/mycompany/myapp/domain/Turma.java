package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Turma.
 */
@Entity
@Table(name = "turma")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Turma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "sala")
    private String sala;

    @ManyToOne
    private Professor professor;

    @OneToMany(mappedBy = "turma")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

    @OneToMany(mappedBy = "turma")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Aula> aulas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public Turma codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getSala() {
        return sala;
    }

    public Turma sala(String sala) {
        this.sala = sala;
        return this;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public Professor getProfessor() {
        return professor;
    }

    public Turma professor(Professor professor) {
        this.professor = professor;
        return this;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Turma alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Turma addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.setTurma(this);
        return this;
    }

    public Turma removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.setTurma(null);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Set<Aula> getAulas() {
        return aulas;
    }

    public Turma aulas(Set<Aula> aulas) {
        this.aulas = aulas;
        return this;
    }

    public Turma addAula(Aula aula) {
        this.aulas.add(aula);
        aula.setTurma(this);
        return this;
    }

    public Turma removeAula(Aula aula) {
        this.aulas.remove(aula);
        aula.setTurma(null);
        return this;
    }

    public void setAulas(Set<Aula> aulas) {
        this.aulas = aulas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Turma turma = (Turma) o;
        if (turma.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), turma.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Turma{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", sala='" + getSala() + "'" +
            "}";
    }
}
