package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.StudentAnswerQuestionAsserts.*;
import static uz.momoit.lms_canvas.domain.StudentAnswerQuestionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudentAnswerQuestionMapperTest {

    private StudentAnswerQuestionMapper studentAnswerQuestionMapper;

    @BeforeEach
    void setUp() {
        studentAnswerQuestionMapper = new StudentAnswerQuestionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudentAnswerQuestionSample1();
        var actual = studentAnswerQuestionMapper.toEntity(studentAnswerQuestionMapper.toDto(expected));
        assertStudentAnswerQuestionAllPropertiesEquals(expected, actual);
    }
}
