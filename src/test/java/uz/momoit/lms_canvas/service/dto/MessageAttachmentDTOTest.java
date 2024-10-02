package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class MessageAttachmentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageAttachmentDTO.class);
        MessageAttachmentDTO messageAttachmentDTO1 = new MessageAttachmentDTO();
        messageAttachmentDTO1.setId(1L);
        MessageAttachmentDTO messageAttachmentDTO2 = new MessageAttachmentDTO();
        assertThat(messageAttachmentDTO1).isNotEqualTo(messageAttachmentDTO2);
        messageAttachmentDTO2.setId(messageAttachmentDTO1.getId());
        assertThat(messageAttachmentDTO1).isEqualTo(messageAttachmentDTO2);
        messageAttachmentDTO2.setId(2L);
        assertThat(messageAttachmentDTO1).isNotEqualTo(messageAttachmentDTO2);
        messageAttachmentDTO1.setId(null);
        assertThat(messageAttachmentDTO1).isNotEqualTo(messageAttachmentDTO2);
    }
}
