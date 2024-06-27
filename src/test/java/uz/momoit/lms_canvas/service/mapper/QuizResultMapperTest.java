package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.QuizResultAsserts.*;
import static uz.momoit.lms_canvas.domain.QuizResultTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class QuizResultMapperTest {

    private QuizResultMapper quizResultMapper;

    @BeforeEach
    void setUp() {
        quizResultMapper = new QuizResultMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getQuizResultSample1();
        var actual = quizResultMapper.toEntity(quizResultMapper.toDto(expected));
        assertQuizResultAllPropertiesEquals(expected, actual);
    }
}
