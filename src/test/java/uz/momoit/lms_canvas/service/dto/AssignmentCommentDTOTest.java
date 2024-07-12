package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AssignmentCommentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentCommentDTO.class);
        AssignmentCommentDTO assignmentCommentDTO1 = new AssignmentCommentDTO();
        assignmentCommentDTO1.setId(1L);
        AssignmentCommentDTO assignmentCommentDTO2 = new AssignmentCommentDTO();
        assertThat(assignmentCommentDTO1).isNotEqualTo(assignmentCommentDTO2);
        assignmentCommentDTO2.setId(assignmentCommentDTO1.getId());
        assertThat(assignmentCommentDTO1).isEqualTo(assignmentCommentDTO2);
        assignmentCommentDTO2.setId(2L);
        assertThat(assignmentCommentDTO1).isNotEqualTo(assignmentCommentDTO2);
        assignmentCommentDTO1.setId(null);
        assertThat(assignmentCommentDTO1).isNotEqualTo(assignmentCommentDTO2);
    }
}
