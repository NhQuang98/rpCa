package demo3.domain;

import static org.assertj.core.api.Assertions.assertThat;

import demo3.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DSTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DS.class);
        DS dS1 = new DS();
        dS1.setId(1L);
        DS dS2 = new DS();
        dS2.setId(dS1.getId());
        assertThat(dS1).isEqualTo(dS2);
        dS2.setId(2L);
        assertThat(dS1).isNotEqualTo(dS2);
        dS1.setId(null);
        assertThat(dS1).isNotEqualTo(dS2);
    }
}
