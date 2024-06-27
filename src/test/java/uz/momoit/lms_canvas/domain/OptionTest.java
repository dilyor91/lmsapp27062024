package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.OptionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuestionTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class OptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Option.class);
        Option option1 = getOptionSample1();
        Option option2 = new Option();
        assertThat(option1).isNotEqualTo(option2);

        option2.setId(option1.getId());
        assertThat(option1).isEqualTo(option2);

        option2 = getOptionSample2();
        assertThat(option1).isNotEqualTo(option2);
    }

    @Test
    void questionTest() {
        Option option = getOptionRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        option.setQuestion(questionBack);
        assertThat(option.getQuestion()).isEqualTo(questionBack);

        option.question(null);
        assertThat(option.getQuestion()).isNull();
    }
}
