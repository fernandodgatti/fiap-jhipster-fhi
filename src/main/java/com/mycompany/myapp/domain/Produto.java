package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "preco")
    private Double preco;

    @ManyToMany
    @JoinTable(
        name = "rel_produto__compra",
        joinColumns = @JoinColumn(name = "produto_id"),
        inverseJoinColumns = @JoinColumn(name = "compra_id")
    )
    @JsonIgnoreProperties(value = { "usuario", "produtos" }, allowSetters = true)
    private Set<Compra> compras = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_produto__supermercado",
        joinColumns = @JoinColumn(name = "produto_id"),
        inverseJoinColumns = @JoinColumn(name = "supermercado_id")
    )
    @JsonIgnoreProperties(value = { "produtos" }, allowSetters = true)
    private Set<Supermercado> supermercados = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Produto descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getQuantidade() {
        return this.quantidade;
    }

    public Produto quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Double getPreco() {
        return this.preco;
    }

    public Produto preco(Double preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Set<Compra> getCompras() {
        return this.compras;
    }

    public Produto compras(Set<Compra> compras) {
        this.setCompras(compras);
        return this;
    }

    public Produto addCompra(Compra compra) {
        this.compras.add(compra);
        compra.getProdutos().add(this);
        return this;
    }

    public Produto removeCompra(Compra compra) {
        this.compras.remove(compra);
        compra.getProdutos().remove(this);
        return this;
    }

    public void setCompras(Set<Compra> compras) {
        this.compras = compras;
    }

    public Set<Supermercado> getSupermercados() {
        return this.supermercados;
    }

    public Produto supermercados(Set<Supermercado> supermercados) {
        this.setSupermercados(supermercados);
        return this;
    }

    public Produto addSupermercado(Supermercado supermercado) {
        this.supermercados.add(supermercado);
        supermercado.getProdutos().add(this);
        return this;
    }

    public Produto removeSupermercado(Supermercado supermercado) {
        this.supermercados.remove(supermercado);
        supermercado.getProdutos().remove(this);
        return this;
    }

    public void setSupermercados(Set<Supermercado> supermercados) {
        this.supermercados = supermercados;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produto)) {
            return false;
        }
        return id != null && id.equals(((Produto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", quantidade=" + getQuantidade() +
            ", preco=" + getPreco() +
            "}";
    }
}
