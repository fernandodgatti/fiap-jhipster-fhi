package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Produto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Produto entity.
 */
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query(
        value = "select distinct produto from Produto produto left join fetch produto.compras left join fetch produto.supermercados",
        countQuery = "select count(distinct produto) from Produto produto"
    )
    Page<Produto> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct produto from Produto produto left join fetch produto.compras left join fetch produto.supermercados")
    List<Produto> findAllWithEagerRelationships();

    @Query(
        "select produto from Produto produto left join fetch produto.compras left join fetch produto.supermercados where produto.id =:id"
    )
    Optional<Produto> findOneWithEagerRelationships(@Param("id") Long id);
}
