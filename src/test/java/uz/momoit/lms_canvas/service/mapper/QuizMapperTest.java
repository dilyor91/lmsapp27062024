package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.QuizAsserts.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class QuizMapperTest {

    private QuizMapper quizMapper;

    @BeforeEach
    void setUp() {
        quizMapper = new QuizMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getQuizSample1();
        var actual = quizMapper.toEntity(quizMapper.toDto(expected));
        assertQuizAllPropertiesEquals(expected, actual);
    }
}
