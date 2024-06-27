package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizDTO.class);
        QuizDTO quizDTO1 = new QuizDTO();
        quizDTO1.setId(1L);
        QuizDTO quizDTO2 = new QuizDTO();
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
        quizDTO2.setId(quizDTO1.getId());
        assertThat(quizDTO1).isEqualTo(quizDTO2);
        quizDTO2.setId(2L);
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
        quizDTO1.setId(null);
        assertThat(quizDTO1).isNotEqualTo(quizDTO2);
    }
}
