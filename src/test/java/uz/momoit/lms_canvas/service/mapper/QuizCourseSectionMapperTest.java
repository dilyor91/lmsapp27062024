package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.QuizCourseSectionAsserts.*;
import static uz.momoit.lms_canvas.domain.QuizCourseSectionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class QuizCourseSectionMapperTest {

    private QuizCourseSectionMapper quizCourseSectionMapper;

    @BeforeEach
    void setUp() {
        quizCourseSectionMapper = new QuizCourseSectionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getQuizCourseSectionSample1();
        var actual = quizCourseSectionMapper.toEntity(quizCourseSectionMapper.toDto(expected));
        assertQuizCourseSectionAllPropertiesEquals(expected, actual);
    }
}
