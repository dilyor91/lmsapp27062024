package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class TagDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TagDTO.class);
        TagDTO tagDTO1 = new TagDTO();
        tagDTO1.setId(1L);
        TagDTO tagDTO2 = new TagDTO();
        assertThat(tagDTO1).isNotEqualTo(tagDTO2);
        tagDTO2.setId(tagDTO1.getId());
        assertThat(tagDTO1).isEqualTo(tagDTO2);
        tagDTO2.setId(2L);
        assertThat(tagDTO1).isNotEqualTo(tagDTO2);
        tagDTO1.setId(null);
        assertThat(tagDTO1).isNotEqualTo(tagDTO2);
    }
}
