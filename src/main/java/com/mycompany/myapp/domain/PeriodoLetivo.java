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
 * A PeriodoLetivo.
 */
@Entity
@Table(name = "periodo_letivo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PeriodoLetivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "mes")
    private Integer mes;

    @Column(name = "ano")
    private Integer ano;

    @OneToMany(mappedBy = "periodoLetivo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Falta> faltas = new HashSet<>();

    @OneToMany(mappedBy = "periodoLetivo")
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

    public PeriodoLetivo codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public Integer getMes() {
        return mes;
    }

    public PeriodoLetivo mes(Integer mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Integer getAno() {
        return ano;
    }

    public PeriodoLetivo ano(Integer ano) {
        this.ano = ano;
        return this;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public Set<Falta> getFaltas() {
        return faltas;
    }

    public PeriodoLetivo faltas(Set<Falta> faltas) {
        this.faltas = faltas;
        return this;
    }

    public PeriodoLetivo addFalta(Falta falta) {
        this.faltas.add(falta);
        falta.setPeriodoLetivo(this);
        return this;
    }

    public PeriodoLetivo removeFalta(Falta falta) {
        this.faltas.remove(falta);
        falta.setPeriodoLetivo(null);
        return this;
    }

    public void setFaltas(Set<Falta> faltas) {
        this.faltas = faltas;
    }

    public Set<Aula> getAulas() {
        return aulas;
    }

    public PeriodoLetivo aulas(Set<Aula> aulas) {
        this.aulas = aulas;
        return this;
    }

    public PeriodoLetivo addAula(Aula aula) {
        this.aulas.add(aula);
        aula.setPeriodoLetivo(this);
        return this;
    }

    public PeriodoLetivo removeAula(Aula aula) {
        this.aulas.remove(aula);
        aula.setPeriodoLetivo(null);
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
        PeriodoLetivo periodoLetivo = (PeriodoLetivo) o;
        if (periodoLetivo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), periodoLetivo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PeriodoLetivo{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", mes=" + getMes() +
            ", ano=" + getAno() +
            "}";
    }
}
