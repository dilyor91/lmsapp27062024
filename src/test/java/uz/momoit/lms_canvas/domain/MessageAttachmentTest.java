package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.MessageAttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.MessageTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class MessageAttachmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageAttachment.class);
        MessageAttachment messageAttachment1 = getMessageAttachmentSample1();
        MessageAttachment messageAttachment2 = new MessageAttachment();
        assertThat(messageAttachment1).isNotEqualTo(messageAttachment2);

        messageAttachment2.setId(messageAttachment1.getId());
        assertThat(messageAttachment1).isEqualTo(messageAttachment2);

        messageAttachment2 = getMessageAttachmentSample2();
        assertThat(messageAttachment1).isNotEqualTo(messageAttachment2);
    }

    @Test
    void messageTest() {
        MessageAttachment messageAttachment = getMessageAttachmentRandomSampleGenerator();
        Message messageBack = getMessageRandomSampleGenerator();

        messageAttachment.setMessage(messageBack);
        assertThat(messageAttachment.getMessage()).isEqualTo(messageBack);

        messageAttachment.message(null);
        assertThat(messageAttachment.getMessage()).isNull();
    }

    @Test
    void attachmentTest() {
        MessageAttachment messageAttachment = getMessageAttachmentRandomSampleGenerator();
        Attachment attachmentBack = getAttachmentRandomSampleGenerator();

        messageAttachment.setAttachment(attachmentBack);
        assertThat(messageAttachment.getAttachment()).isEqualTo(attachmentBack);

        messageAttachment.attachment(null);
        assertThat(messageAttachment.getAttachment()).isNull();
    }
}
