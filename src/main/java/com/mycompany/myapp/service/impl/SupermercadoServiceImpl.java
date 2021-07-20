package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Supermercado;
import com.mycompany.myapp.repository.SupermercadoRepository;
import com.mycompany.myapp.service.SupermercadoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Supermercado}.
 */
@Service
@Transactional
public class SupermercadoServiceImpl implements SupermercadoService {

    private final Logger log = LoggerFactory.getLogger(SupermercadoServiceImpl.class);

    private final SupermercadoRepository supermercadoRepository;

    public SupermercadoServiceImpl(SupermercadoRepository supermercadoRepository) {
        this.supermercadoRepository = supermercadoRepository;
    }

    @Override
    public Supermercado save(Supermercado supermercado) {
        log.debug("Request to save Supermercado : {}", supermercado);
        return supermercadoRepository.save(supermercado);
    }

    @Override
    public Optional<Supermercado> partialUpdate(Supermercado supermercado) {
        log.debug("Request to partially update Supermercado : {}", supermercado);

        return supermercadoRepository
            .findById(supermercado.getId())
            .map(
                existingSupermercado -> {
                    if (supermercado.getNome() != null) {
                        existingSupermercado.setNome(supermercado.getNome());
                    }
                    if (supermercado.getCnpj() != null) {
                        existingSupermercado.setCnpj(supermercado.getCnpj());
                    }

                    return existingSupermercado;
                }
            )
            .map(supermercadoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Supermercado> findAll(Pageable pageable) {
        log.debug("Request to get all Supermercados");
        return supermercadoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Supermercado> findOne(Long id) {
        log.debug("Request to get Supermercado : {}", id);
        return supermercadoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Supermercado : {}", id);
        supermercadoRepository.deleteById(id);
    }
}
