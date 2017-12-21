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
 * A Permissao.
 */
@Entity
@Table(name = "permissao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Permissao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "tipo")
    private String tipo;

    @OneToMany(mappedBy = "permissao")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Usuario> usuarios = new HashSet<>();

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

    public Permissao codigo(Integer codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public Permissao tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios;
    }

    public Permissao usuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
        return this;
    }

    public Permissao addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.setPermissao(this);
        return this;
    }

    public Permissao removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.setPermissao(null);
        return this;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
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
        Permissao permissao = (Permissao) o;
        if (permissao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), permissao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Permissao{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
