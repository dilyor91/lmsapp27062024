package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CommunityCourseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommunityCourseDTO.class);
        CommunityCourseDTO communityCourseDTO1 = new CommunityCourseDTO();
        communityCourseDTO1.setId(1L);
        CommunityCourseDTO communityCourseDTO2 = new CommunityCourseDTO();
        assertThat(communityCourseDTO1).isNotEqualTo(communityCourseDTO2);
        communityCourseDTO2.setId(communityCourseDTO1.getId());
        assertThat(communityCourseDTO1).isEqualTo(communityCourseDTO2);
        communityCourseDTO2.setId(2L);
        assertThat(communityCourseDTO1).isNotEqualTo(communityCourseDTO2);
        communityCourseDTO1.setId(null);
        assertThat(communityCourseDTO1).isNotEqualTo(communityCourseDTO2);
    }
}
