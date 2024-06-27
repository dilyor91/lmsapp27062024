package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.QuizQuestionGroupAsserts.*;
import static uz.momoit.lms_canvas.domain.QuizQuestionGroupTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class QuizQuestionGroupMapperTest {

    private QuizQuestionGroupMapper quizQuestionGroupMapper;

    @BeforeEach
    void setUp() {
        quizQuestionGroupMapper = new QuizQuestionGroupMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getQuizQuestionGroupSample1();
        var actual = quizQuestionGroupMapper.toEntity(quizQuestionGroupMapper.toDto(expected));
        assertQuizQuestionGroupAllPropertiesEquals(expected, actual);
    }
}
