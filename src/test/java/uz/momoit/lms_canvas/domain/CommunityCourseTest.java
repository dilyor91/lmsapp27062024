package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CommunityCourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.CommunityTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityCourseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityCourse.class);
        CommunityCourse communityCourse1 = getCommunityCourseSample1();
        CommunityCourse communityCourse2 = new CommunityCourse();
        assertThat(communityCourse1).isNotEqualTo(communityCourse2);

        communityCourse2.setId(communityCourse1.getId());
        assertThat(communityCourse1).isEqualTo(communityCourse2);

        communityCourse2 = getCommunityCourseSample2();
        assertThat(communityCourse1).isNotEqualTo(communityCourse2);
    }

    @Test
    void communityTest() {
        CommunityCourse communityCourse = getCommunityCourseRandomSampleGenerator();
        Community communityBack = getCommunityRandomSampleGenerator();

        communityCourse.setCommunity(communityBack);
        assertThat(communityCourse.getCommunity()).isEqualTo(communityBack);

        communityCourse.community(null);
        assertThat(communityCourse.getCommunity()).isNull();
    }

    @Test
    void courseTest() {
        CommunityCourse communityCourse = getCommunityCourseRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        communityCourse.setCourse(courseBack);
        assertThat(communityCourse.getCourse()).isEqualTo(courseBack);

        communityCourse.course(null);
        assertThat(communityCourse.getCourse()).isNull();
    }
}
