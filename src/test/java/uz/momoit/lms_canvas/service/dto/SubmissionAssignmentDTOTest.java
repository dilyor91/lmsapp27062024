package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class SubmissionAssignmentDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubmissionAssignmentDTO.class);
        SubmissionAssignmentDTO submissionAssignmentDTO1 = new SubmissionAssignmentDTO();
        submissionAssignmentDTO1.setId(1L);
        SubmissionAssignmentDTO submissionAssignmentDTO2 = new SubmissionAssignmentDTO();
        assertThat(submissionAssignmentDTO1).isNotEqualTo(submissionAssignmentDTO2);
        submissionAssignmentDTO2.setId(submissionAssignmentDTO1.getId());
        assertThat(submissionAssignmentDTO1).isEqualTo(submissionAssignmentDTO2);
        submissionAssignmentDTO2.setId(2L);
        assertThat(submissionAssignmentDTO1).isNotEqualTo(submissionAssignmentDTO2);
        submissionAssignmentDTO1.setId(null);
        assertThat(submissionAssignmentDTO1).isNotEqualTo(submissionAssignmentDTO2);
    }
}
