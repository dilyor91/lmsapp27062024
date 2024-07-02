package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AssignmentCourseSectionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentCourseSectionDTO.class);
        AssignmentCourseSectionDTO assignmentCourseSectionDTO1 = new AssignmentCourseSectionDTO();
        assignmentCourseSectionDTO1.setId(1L);
        AssignmentCourseSectionDTO assignmentCourseSectionDTO2 = new AssignmentCourseSectionDTO();
        assertThat(assignmentCourseSectionDTO1).isNotEqualTo(assignmentCourseSectionDTO2);
        assignmentCourseSectionDTO2.setId(assignmentCourseSectionDTO1.getId());
        assertThat(assignmentCourseSectionDTO1).isEqualTo(assignmentCourseSectionDTO2);
        assignmentCourseSectionDTO2.setId(2L);
        assertThat(assignmentCourseSectionDTO1).isNotEqualTo(assignmentCourseSectionDTO2);
        assignmentCourseSectionDTO1.setId(null);
        assertThat(assignmentCourseSectionDTO1).isNotEqualTo(assignmentCourseSectionDTO2);
    }
}
