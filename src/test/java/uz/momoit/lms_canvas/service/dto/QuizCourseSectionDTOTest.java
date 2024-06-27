package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizCourseSectionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizCourseSectionDTO.class);
        QuizCourseSectionDTO quizCourseSectionDTO1 = new QuizCourseSectionDTO();
        quizCourseSectionDTO1.setId(1L);
        QuizCourseSectionDTO quizCourseSectionDTO2 = new QuizCourseSectionDTO();
        assertThat(quizCourseSectionDTO1).isNotEqualTo(quizCourseSectionDTO2);
        quizCourseSectionDTO2.setId(quizCourseSectionDTO1.getId());
        assertThat(quizCourseSectionDTO1).isEqualTo(quizCourseSectionDTO2);
        quizCourseSectionDTO2.setId(2L);
        assertThat(quizCourseSectionDTO1).isNotEqualTo(quizCourseSectionDTO2);
        quizCourseSectionDTO1.setId(null);
        assertThat(quizCourseSectionDTO1).isNotEqualTo(quizCourseSectionDTO2);
    }
}
