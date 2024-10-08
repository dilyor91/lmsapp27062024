package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CommunityAttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CommunityTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityAttachmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityAttachment.class);
        CommunityAttachment communityAttachment1 = getCommunityAttachmentSample1();
        CommunityAttachment communityAttachment2 = new CommunityAttachment();
        assertThat(communityAttachment1).isNotEqualTo(communityAttachment2);

        communityAttachment2.setId(communityAttachment1.getId());
        assertThat(communityAttachment1).isEqualTo(communityAttachment2);

        communityAttachment2 = getCommunityAttachmentSample2();
        assertThat(communityAttachment1).isNotEqualTo(communityAttachment2);
    }

    @Test
    void communityTest() {
        CommunityAttachment communityAttachment = getCommunityAttachmentRandomSampleGenerator();
        Community communityBack = getCommunityRandomSampleGenerator();

        communityAttachment.setCommunity(communityBack);
        assertThat(communityAttachment.getCommunity()).isEqualTo(communityBack);

        communityAttachment.community(null);
        assertThat(communityAttachment.getCommunity()).isNull();
    }

    @Test
    void attachmentTest() {
        CommunityAttachment communityAttachment = getCommunityAttachmentRandomSampleGenerator();
        Attachment attachmentBack = getAttachmentRandomSampleGenerator();

        communityAttachment.setAttachment(attachmentBack);
        assertThat(communityAttachment.getAttachment()).isEqualTo(attachmentBack);

        communityAttachment.attachment(null);
        assertThat(communityAttachment.getAttachment()).isNull();
    }
}
