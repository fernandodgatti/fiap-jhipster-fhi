package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Status;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Compra.
 */
@Entity
@Table(name = "compra")
public class Compra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "datacompra")
    private Instant datacompra;

    @Column(name = "id_pedido")
    private Integer idPedido;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties(value = { "compras" }, allowSetters = true)
    private Usuario usuario;

    @ManyToMany(mappedBy = "compras")
    @JsonIgnoreProperties(value = { "compras", "supermercados" }, allowSetters = true)
    private Set<Produto> produtos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Compra id(Long id) {
        this.id = id;
        return this;
    }

    public Instant getDatacompra() {
        return this.datacompra;
    }

    public Compra datacompra(Instant datacompra) {
        this.datacompra = datacompra;
        return this;
    }

    public void setDatacompra(Instant datacompra) {
        this.datacompra = datacompra;
    }

    public Integer getIdPedido() {
        return this.idPedido;
    }

    public Compra idPedido(Integer idPedido) {
        this.idPedido = idPedido;
        return this;
    }

    public void setIdPedido(Integer idPedido) {
        this.idPedido = idPedido;
    }

    public Integer getQuantidade() {
        return this.quantidade;
    }

    public Compra quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Status getStatus() {
        return this.status;
    }

    public Compra status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public Compra usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Produto> getProdutos() {
        return this.produtos;
    }

    public Compra produtos(Set<Produto> produtos) {
        this.setProdutos(produtos);
        return this;
    }

    public Compra addProduto(Produto produto) {
        this.produtos.add(produto);
        produto.getCompras().add(this);
        return this;
    }

    public Compra removeProduto(Produto produto) {
        this.produtos.remove(produto);
        produto.getCompras().remove(this);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        if (this.produtos != null) {
            this.produtos.forEach(i -> i.removeCompra(this));
        }
        if (produtos != null) {
            produtos.forEach(i -> i.addCompra(this));
        }
        this.produtos = produtos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Compra)) {
            return false;
        }
        return id != null && id.equals(((Compra) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Compra{" +
            "id=" + getId() +
            ", datacompra='" + getDatacompra() + "'" +
            ", idPedido=" + getIdPedido() +
            ", quantidade=" + getQuantidade() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
