package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.QuizSessionAsserts.*;
import static uz.momoit.lms_canvas.domain.QuizSessionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class QuizSessionMapperTest {

    private QuizSessionMapper quizSessionMapper;

    @BeforeEach
    void setUp() {
        quizSessionMapper = new QuizSessionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getQuizSessionSample1();
        var actual = quizSessionMapper.toEntity(quizSessionMapper.toDto(expected));
        assertQuizSessionAllPropertiesEquals(expected, actual);
    }
}
