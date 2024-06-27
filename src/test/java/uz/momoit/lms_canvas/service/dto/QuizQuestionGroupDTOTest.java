package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizQuestionGroupDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizQuestionGroupDTO.class);
        QuizQuestionGroupDTO quizQuestionGroupDTO1 = new QuizQuestionGroupDTO();
        quizQuestionGroupDTO1.setId(1L);
        QuizQuestionGroupDTO quizQuestionGroupDTO2 = new QuizQuestionGroupDTO();
        assertThat(quizQuestionGroupDTO1).isNotEqualTo(quizQuestionGroupDTO2);
        quizQuestionGroupDTO2.setId(quizQuestionGroupDTO1.getId());
        assertThat(quizQuestionGroupDTO1).isEqualTo(quizQuestionGroupDTO2);
        quizQuestionGroupDTO2.setId(2L);
        assertThat(quizQuestionGroupDTO1).isNotEqualTo(quizQuestionGroupDTO2);
        quizQuestionGroupDTO1.setId(null);
        assertThat(quizQuestionGroupDTO1).isNotEqualTo(quizQuestionGroupDTO2);
    }
}
