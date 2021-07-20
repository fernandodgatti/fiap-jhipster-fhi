package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SupermercadoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Supermercado.class);
        Supermercado supermercado1 = new Supermercado();
        supermercado1.setId(1L);
        Supermercado supermercado2 = new Supermercado();
        supermercado2.setId(supermercado1.getId());
        assertThat(supermercado1).isEqualTo(supermercado2);
        supermercado2.setId(2L);
        assertThat(supermercado1).isNotEqualTo(supermercado2);
        supermercado1.setId(null);
        assertThat(supermercado1).isNotEqualTo(supermercado2);
    }
}
