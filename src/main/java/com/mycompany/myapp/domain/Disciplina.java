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
 * A Disciplina.
 */
@Entity
@Table(name = "disciplina")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Disciplina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "disciplina")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Atividade> atividades = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "disciplina_professor",
               joinColumns = @JoinColumn(name="disciplinas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="professors_id", referencedColumnName="id"))
    private Set<Professor> professors = new HashSet<>();

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

    public Disciplina codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public Disciplina nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Atividade> getAtividades() {
        return atividades;
    }

    public Disciplina atividades(Set<Atividade> atividades) {
        this.atividades = atividades;
        return this;
    }

    public Disciplina addAtividade(Atividade atividade) {
        this.atividades.add(atividade);
        atividade.setDisciplina(this);
        return this;
    }

    public Disciplina removeAtividade(Atividade atividade) {
        this.atividades.remove(atividade);
        atividade.setDisciplina(null);
        return this;
    }

    public void setAtividades(Set<Atividade> atividades) {
        this.atividades = atividades;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public Disciplina professors(Set<Professor> professors) {
        this.professors = professors;
        return this;
    }

    public Disciplina addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.getDisciplinas().add(this);
        return this;
    }

    public Disciplina removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.getDisciplinas().remove(this);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        this.professors = professors;
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
        Disciplina disciplina = (Disciplina) o;
        if (disciplina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), disciplina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Disciplina{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
