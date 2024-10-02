package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.MessageTestSamples.*;
import static uz.momoit.lms_canvas.domain.MessageToUserTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class MessageToUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageToUser.class);
        MessageToUser messageToUser1 = getMessageToUserSample1();
        MessageToUser messageToUser2 = new MessageToUser();
        assertThat(messageToUser1).isNotEqualTo(messageToUser2);

        messageToUser2.setId(messageToUser1.getId());
        assertThat(messageToUser1).isEqualTo(messageToUser2);

        messageToUser2 = getMessageToUserSample2();
        assertThat(messageToUser1).isNotEqualTo(messageToUser2);
    }

    @Test
    void messageTest() {
        MessageToUser messageToUser = getMessageToUserRandomSampleGenerator();
        Message messageBack = getMessageRandomSampleGenerator();

        messageToUser.setMessage(messageBack);
        assertThat(messageToUser.getMessage()).isEqualTo(messageBack);

        messageToUser.message(null);
        assertThat(messageToUser.getMessage()).isNull();
    }
}
