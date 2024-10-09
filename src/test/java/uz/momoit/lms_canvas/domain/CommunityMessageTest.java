package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CommunityMessageTestSamples.*;
import static uz.momoit.lms_canvas.domain.CommunityTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityMessageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityMessage.class);
        CommunityMessage communityMessage1 = getCommunityMessageSample1();
        CommunityMessage communityMessage2 = new CommunityMessage();
        assertThat(communityMessage1).isNotEqualTo(communityMessage2);

        communityMessage2.setId(communityMessage1.getId());
        assertThat(communityMessage1).isEqualTo(communityMessage2);

        communityMessage2 = getCommunityMessageSample2();
        assertThat(communityMessage1).isNotEqualTo(communityMessage2);
    }

    @Test
    void communityTest() {
        CommunityMessage communityMessage = getCommunityMessageRandomSampleGenerator();
        Community communityBack = getCommunityRandomSampleGenerator();

        communityMessage.setCommunity(communityBack);
        assertThat(communityMessage.getCommunity()).isEqualTo(communityBack);

        communityMessage.community(null);
        assertThat(communityMessage.getCommunity()).isNull();
    }
}
