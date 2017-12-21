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
 * A Professor.
 */
@Entity
@Table(name = "professor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Professor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "grau")
    private String grau;

    @Column(name = "salario")
    private Double salario;

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Turma> turmas = new HashSet<>();

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Atividade> atividades = new HashSet<>();

    @ManyToMany(mappedBy = "professors")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Disciplina> disciplinas = new HashSet<>();

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

    public Professor codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getGrau() {
        return grau;
    }

    public Professor grau(String grau) {
        this.grau = grau;
        return this;
    }

    public void setGrau(String grau) {
        this.grau = grau;
    }

    public Double getSalario() {
        return salario;
    }

    public Professor salario(Double salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Set<Turma> getTurmas() {
        return turmas;
    }

    public Professor turmas(Set<Turma> turmas) {
        this.turmas = turmas;
        return this;
    }

    public Professor addTurma(Turma turma) {
        this.turmas.add(turma);
        turma.setProfessor(this);
        return this;
    }

    public Professor removeTurma(Turma turma) {
        this.turmas.remove(turma);
        turma.setProfessor(null);
        return this;
    }

    public void setTurmas(Set<Turma> turmas) {
        this.turmas = turmas;
    }

    public Set<Atividade> getAtividades() {
        return atividades;
    }

    public Professor atividades(Set<Atividade> atividades) {
        this.atividades = atividades;
        return this;
    }

    public Professor addAtividade(Atividade atividade) {
        this.atividades.add(atividade);
        atividade.setProfessor(this);
        return this;
    }

    public Professor removeAtividade(Atividade atividade) {
        this.atividades.remove(atividade);
        atividade.setProfessor(null);
        return this;
    }

    public void setAtividades(Set<Atividade> atividades) {
        this.atividades = atividades;
    }

    public Set<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public Professor disciplinas(Set<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
        return this;
    }

    public Professor addDisciplina(Disciplina disciplina) {
        this.disciplinas.add(disciplina);
        disciplina.getProfessors().add(this);
        return this;
    }

    public Professor removeDisciplina(Disciplina disciplina) {
        this.disciplinas.remove(disciplina);
        disciplina.getProfessors().remove(this);
        return this;
    }

    public void setDisciplinas(Set<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
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
        Professor professor = (Professor) o;
        if (professor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Professor{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", grau='" + getGrau() + "'" +
            ", salario=" + getSalario() +
            "}";
    }
}
