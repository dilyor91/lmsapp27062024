package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class MessageToUserDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageToUserDTO.class);
        MessageToUserDTO messageToUserDTO1 = new MessageToUserDTO();
        messageToUserDTO1.setId(1L);
        MessageToUserDTO messageToUserDTO2 = new MessageToUserDTO();
        assertThat(messageToUserDTO1).isNotEqualTo(messageToUserDTO2);
        messageToUserDTO2.setId(messageToUserDTO1.getId());
        assertThat(messageToUserDTO1).isEqualTo(messageToUserDTO2);
        messageToUserDTO2.setId(2L);
        assertThat(messageToUserDTO1).isNotEqualTo(messageToUserDTO2);
        messageToUserDTO1.setId(null);
        assertThat(messageToUserDTO1).isNotEqualTo(messageToUserDTO2);
    }
}
