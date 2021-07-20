package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Compra;
import com.mycompany.myapp.repository.CompraRepository;
import com.mycompany.myapp.service.CompraService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Compra}.
 */
@Service
@Transactional
public class CompraServiceImpl implements CompraService {

    private final Logger log = LoggerFactory.getLogger(CompraServiceImpl.class);

    private final CompraRepository compraRepository;

    public CompraServiceImpl(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    @Override
    public Compra save(Compra compra) {
        log.debug("Request to save Compra : {}", compra);
        return compraRepository.save(compra);
    }

    @Override
    public Optional<Compra> partialUpdate(Compra compra) {
        log.debug("Request to partially update Compra : {}", compra);

        return compraRepository
            .findById(compra.getId())
            .map(
                existingCompra -> {
                    if (compra.getDatacompra() != null) {
                        existingCompra.setDatacompra(compra.getDatacompra());
                    }
                    if (compra.getIdPedido() != null) {
                        existingCompra.setIdPedido(compra.getIdPedido());
                    }
                    if (compra.getQuantidade() != null) {
                        existingCompra.setQuantidade(compra.getQuantidade());
                    }
                    if (compra.getStatus() != null) {
                        existingCompra.setStatus(compra.getStatus());
                    }

                    return existingCompra;
                }
            )
            .map(compraRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Compra> findAll(Pageable pageable) {
        log.debug("Request to get all Compras");
        return compraRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Compra> findOne(Long id) {
        log.debug("Request to get Compra : {}", id);
        return compraRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Compra : {}", id);
        compraRepository.deleteById(id);
    }
}
