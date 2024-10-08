package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityDTO.class);
        CommunityDTO communityDTO1 = new CommunityDTO();
        communityDTO1.setId(1L);
        CommunityDTO communityDTO2 = new CommunityDTO();
        assertThat(communityDTO1).isNotEqualTo(communityDTO2);
        communityDTO2.setId(communityDTO1.getId());
        assertThat(communityDTO1).isEqualTo(communityDTO2);
        communityDTO2.setId(2L);
        assertThat(communityDTO1).isNotEqualTo(communityDTO2);
        communityDTO1.setId(null);
        assertThat(communityDTO1).isNotEqualTo(communityDTO2);
    }
}
