package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.StudentQuestionAsserts.*;
import static uz.momoit.lms_canvas.domain.StudentQuestionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudentQuestionMapperTest {

    private StudentQuestionMapper studentQuestionMapper;

    @BeforeEach
    void setUp() {
        studentQuestionMapper = new StudentQuestionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudentQuestionSample1();
        var actual = studentQuestionMapper.toEntity(studentQuestionMapper.toDto(expected));
        assertStudentQuestionAllPropertiesEquals(expected, actual);
    }
}
