package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class WikiPageDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WikiPageDTO.class);
        WikiPageDTO wikiPageDTO1 = new WikiPageDTO();
        wikiPageDTO1.setId(1L);
        WikiPageDTO wikiPageDTO2 = new WikiPageDTO();
        assertThat(wikiPageDTO1).isNotEqualTo(wikiPageDTO2);
        wikiPageDTO2.setId(wikiPageDTO1.getId());
        assertThat(wikiPageDTO1).isEqualTo(wikiPageDTO2);
        wikiPageDTO2.setId(2L);
        assertThat(wikiPageDTO1).isNotEqualTo(wikiPageDTO2);
        wikiPageDTO1.setId(null);
        assertThat(wikiPageDTO1).isNotEqualTo(wikiPageDTO2);
    }
}
