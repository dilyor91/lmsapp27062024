package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityTagDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityTagDTO.class);
        CommunityTagDTO communityTagDTO1 = new CommunityTagDTO();
        communityTagDTO1.setId(1L);
        CommunityTagDTO communityTagDTO2 = new CommunityTagDTO();
        assertThat(communityTagDTO1).isNotEqualTo(communityTagDTO2);
        communityTagDTO2.setId(communityTagDTO1.getId());
        assertThat(communityTagDTO1).isEqualTo(communityTagDTO2);
        communityTagDTO2.setId(2L);
        assertThat(communityTagDTO1).isNotEqualTo(communityTagDTO2);
        communityTagDTO1.setId(null);
        assertThat(communityTagDTO1).isNotEqualTo(communityTagDTO2);
    }
}
