package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Usuario;
import com.mycompany.myapp.repository.UsuarioRepository;
import com.mycompany.myapp.service.UsuarioService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Usuario}.
 */
@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario save(Usuario usuario) {
        log.debug("Request to save Usuario : {}", usuario);
        return usuarioRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> partialUpdate(Usuario usuario) {
        log.debug("Request to partially update Usuario : {}", usuario);

        return usuarioRepository
            .findById(usuario.getId())
            .map(
                existingUsuario -> {
                    if (usuario.getUsuario() != null) {
                        existingUsuario.setUsuario(usuario.getUsuario());
                    }
                    if (usuario.getNome() != null) {
                        existingUsuario.setNome(usuario.getNome());
                    }
                    if (usuario.getSobrenome() != null) {
                        existingUsuario.setSobrenome(usuario.getSobrenome());
                    }
                    if (usuario.getEmail() != null) {
                        existingUsuario.setEmail(usuario.getEmail());
                    }
                    if (usuario.getSenha() != null) {
                        existingUsuario.setSenha(usuario.getSenha());
                    }
                    if (usuario.getTelefone() != null) {
                        existingUsuario.setTelefone(usuario.getTelefone());
                    }
                    if (usuario.getStatus() != null) {
                        existingUsuario.setStatus(usuario.getStatus());
                    }

                    return existingUsuario;
                }
            )
            .map(usuarioRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Usuario> findAll(Pageable pageable) {
        log.debug("Request to get all Usuarios");
        return usuarioRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> findOne(Long id) {
        log.debug("Request to get Usuario : {}", id);
        return usuarioRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Usuario : {}", id);
        usuarioRepository.deleteById(id);
    }
}
