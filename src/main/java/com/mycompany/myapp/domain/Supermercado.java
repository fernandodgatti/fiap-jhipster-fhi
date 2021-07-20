package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Supermercado.
 */
@Entity
@Table(name = "supermercado")
public class Supermercado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cnpj")
    private String cnpj;

    @ManyToMany(mappedBy = "supermercados")
    @JsonIgnoreProperties(value = { "compras", "supermercados" }, allowSetters = true)
    private Set<Produto> produtos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Supermercado id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Supermercado nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public Supermercado cnpj(String cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public Set<Produto> getProdutos() {
        return this.produtos;
    }

    public Supermercado produtos(Set<Produto> produtos) {
        this.setProdutos(produtos);
        return this;
    }

    public Supermercado addProduto(Produto produto) {
        this.produtos.add(produto);
        produto.getSupermercados().add(this);
        return this;
    }

    public Supermercado removeProduto(Produto produto) {
        this.produtos.remove(produto);
        produto.getSupermercados().remove(this);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        if (this.produtos != null) {
            this.produtos.forEach(i -> i.removeSupermercado(this));
        }
        if (produtos != null) {
            produtos.forEach(i -> i.addSupermercado(this));
        }
        this.produtos = produtos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Supermercado)) {
            return false;
        }
        return id != null && id.equals(((Supermercado) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Supermercado{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cnpj='" + getCnpj() + "'" +
            "}";
    }
}
