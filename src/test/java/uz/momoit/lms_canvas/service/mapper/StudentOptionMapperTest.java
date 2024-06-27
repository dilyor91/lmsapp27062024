package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.StudentOptionAsserts.*;
import static uz.momoit.lms_canvas.domain.StudentOptionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudentOptionMapperTest {

    private StudentOptionMapper studentOptionMapper;

    @BeforeEach
    void setUp() {
        studentOptionMapper = new StudentOptionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudentOptionSample1();
        var actual = studentOptionMapper.toEntity(studentOptionMapper.toDto(expected));
        assertStudentOptionAllPropertiesEquals(expected, actual);
    }
}
