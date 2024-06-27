package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizSessionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizSessionDTO.class);
        QuizSessionDTO quizSessionDTO1 = new QuizSessionDTO();
        quizSessionDTO1.setId(1L);
        QuizSessionDTO quizSessionDTO2 = new QuizSessionDTO();
        assertThat(quizSessionDTO1).isNotEqualTo(quizSessionDTO2);
        quizSessionDTO2.setId(quizSessionDTO1.getId());
        assertThat(quizSessionDTO1).isEqualTo(quizSessionDTO2);
        quizSessionDTO2.setId(2L);
        assertThat(quizSessionDTO1).isNotEqualTo(quizSessionDTO2);
        quizSessionDTO1.setId(null);
        assertThat(quizSessionDTO1).isNotEqualTo(quizSessionDTO2);
    }
}
