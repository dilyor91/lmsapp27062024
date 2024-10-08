package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CommunityTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Community.class);
        Community community1 = getCommunitySample1();
        Community community2 = new Community();
        assertThat(community1).isNotEqualTo(community2);

        community2.setId(community1.getId());
        assertThat(community1).isEqualTo(community2);

        community2 = getCommunitySample2();
        assertThat(community1).isNotEqualTo(community2);
    }
}
