package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CommunityTagTestSamples.*;
import static uz.momoit.lms_canvas.domain.CommunityTestSamples.*;
import static uz.momoit.lms_canvas.domain.TagTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityTagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityTag.class);
        CommunityTag communityTag1 = getCommunityTagSample1();
        CommunityTag communityTag2 = new CommunityTag();
        assertThat(communityTag1).isNotEqualTo(communityTag2);

        communityTag2.setId(communityTag1.getId());
        assertThat(communityTag1).isEqualTo(communityTag2);

        communityTag2 = getCommunityTagSample2();
        assertThat(communityTag1).isNotEqualTo(communityTag2);
    }

    @Test
    void communityTest() {
        CommunityTag communityTag = getCommunityTagRandomSampleGenerator();
        Community communityBack = getCommunityRandomSampleGenerator();

        communityTag.setCommunity(communityBack);
        assertThat(communityTag.getCommunity()).isEqualTo(communityBack);

        communityTag.community(null);
        assertThat(communityTag.getCommunity()).isNull();
    }

    @Test
    void tagTest() {
        CommunityTag communityTag = getCommunityTagRandomSampleGenerator();
        Tag tagBack = getTagRandomSampleGenerator();

        communityTag.setTag(tagBack);
        assertThat(communityTag.getTag()).isEqualTo(tagBack);

        communityTag.tag(null);
        assertThat(communityTag.getTag()).isNull();
    }
}
