package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityAttachmentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityAttachmentDTO.class);
        CommunityAttachmentDTO communityAttachmentDTO1 = new CommunityAttachmentDTO();
        communityAttachmentDTO1.setId(1L);
        CommunityAttachmentDTO communityAttachmentDTO2 = new CommunityAttachmentDTO();
        assertThat(communityAttachmentDTO1).isNotEqualTo(communityAttachmentDTO2);
        communityAttachmentDTO2.setId(communityAttachmentDTO1.getId());
        assertThat(communityAttachmentDTO1).isEqualTo(communityAttachmentDTO2);
        communityAttachmentDTO2.setId(2L);
        assertThat(communityAttachmentDTO1).isNotEqualTo(communityAttachmentDTO2);
        communityAttachmentDTO1.setId(null);
        assertThat(communityAttachmentDTO1).isNotEqualTo(communityAttachmentDTO2);
    }
}
