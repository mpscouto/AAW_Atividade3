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
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "matricula")
    private String matricula;

    @OneToMany(mappedBy = "aluno")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Falta> faltas = new HashSet<>();

    @OneToMany(mappedBy = "aluno")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Nota> notas = new HashSet<>();

    @OneToMany(mappedBy = "aluno")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Entrega> entregas = new HashSet<>();

    @ManyToOne
    private Turma turma;

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

    public Aluno codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getMatricula() {
        return matricula;
    }

    public Aluno matricula(String matricula) {
        this.matricula = matricula;
        return this;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public Set<Falta> getFaltas() {
        return faltas;
    }

    public Aluno faltas(Set<Falta> faltas) {
        this.faltas = faltas;
        return this;
    }

    public Aluno addFalta(Falta falta) {
        this.faltas.add(falta);
        falta.setAluno(this);
        return this;
    }

    public Aluno removeFalta(Falta falta) {
        this.faltas.remove(falta);
        falta.setAluno(null);
        return this;
    }

    public void setFaltas(Set<Falta> faltas) {
        this.faltas = faltas;
    }

    public Set<Nota> getNotas() {
        return notas;
    }

    public Aluno notas(Set<Nota> notas) {
        this.notas = notas;
        return this;
    }

    public Aluno addNota(Nota nota) {
        this.notas.add(nota);
        nota.setAluno(this);
        return this;
    }

    public Aluno removeNota(Nota nota) {
        this.notas.remove(nota);
        nota.setAluno(null);
        return this;
    }

    public void setNotas(Set<Nota> notas) {
        this.notas = notas;
    }

    public Set<Entrega> getEntregas() {
        return entregas;
    }

    public Aluno entregas(Set<Entrega> entregas) {
        this.entregas = entregas;
        return this;
    }

    public Aluno addEntrega(Entrega entrega) {
        this.entregas.add(entrega);
        entrega.setAluno(this);
        return this;
    }

    public Aluno removeEntrega(Entrega entrega) {
        this.entregas.remove(entrega);
        entrega.setAluno(null);
        return this;
    }

    public void setEntregas(Set<Entrega> entregas) {
        this.entregas = entregas;
    }

    public Turma getTurma() {
        return turma;
    }

    public Aluno turma(Turma turma) {
        this.turma = turma;
        return this;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
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
        Aluno aluno = (Aluno) o;
        if (aluno.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aluno.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", matricula='" + getMatricula() + "'" +
            "}";
    }
}
