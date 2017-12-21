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
 * A Aula.
 */
@Entity
@Table(name = "aula")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "horario_inicio")
    private String horarioInicio;

    @Column(name = "horario_termino")
    private String horarioTermino;

    @ManyToOne
    private Turma turma;

    @OneToMany(mappedBy = "aula")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Falta> faltas = new HashSet<>();

    @ManyToOne
    private PeriodoLetivo periodoLetivo;

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

    public Aula codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getHorarioInicio() {
        return horarioInicio;
    }

    public Aula horarioInicio(String horarioInicio) {
        this.horarioInicio = horarioInicio;
        return this;
    }

    public void setHorarioInicio(String horarioInicio) {
        this.horarioInicio = horarioInicio;
    }

    public String getHorarioTermino() {
        return horarioTermino;
    }

    public Aula horarioTermino(String horarioTermino) {
        this.horarioTermino = horarioTermino;
        return this;
    }

    public void setHorarioTermino(String horarioTermino) {
        this.horarioTermino = horarioTermino;
    }

    public Turma getTurma() {
        return turma;
    }

    public Aula turma(Turma turma) {
        this.turma = turma;
        return this;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Set<Falta> getFaltas() {
        return faltas;
    }

    public Aula faltas(Set<Falta> faltas) {
        this.faltas = faltas;
        return this;
    }

    public Aula addFalta(Falta falta) {
        this.faltas.add(falta);
        falta.setAula(this);
        return this;
    }

    public Aula removeFalta(Falta falta) {
        this.faltas.remove(falta);
        falta.setAula(null);
        return this;
    }

    public void setFaltas(Set<Falta> faltas) {
        this.faltas = faltas;
    }

    public PeriodoLetivo getPeriodoLetivo() {
        return periodoLetivo;
    }

    public Aula periodoLetivo(PeriodoLetivo periodoLetivo) {
        this.periodoLetivo = periodoLetivo;
        return this;
    }

    public void setPeriodoLetivo(PeriodoLetivo periodoLetivo) {
        this.periodoLetivo = periodoLetivo;
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
        Aula aula = (Aula) o;
        if (aula.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aula.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aula{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", horarioInicio='" + getHorarioInicio() + "'" +
            ", horarioTermino='" + getHorarioTermino() + "'" +
            "}";
    }
}
