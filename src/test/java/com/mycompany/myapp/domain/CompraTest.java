package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CompraTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Compra.class);
        Compra compra1 = new Compra();
        compra1.setId(1L);
        Compra compra2 = new Compra();
        compra2.setId(compra1.getId());
        assertThat(compra1).isEqualTo(compra2);
        compra2.setId(2L);
        assertThat(compra1).isNotEqualTo(compra2);
        compra1.setId(null);
        assertThat(compra1).isNotEqualTo(compra2);
    }
}
