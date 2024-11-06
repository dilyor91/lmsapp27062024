package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.ExamResultAsserts.*;
import static uz.momoit.lms_canvas.domain.ExamResultTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExamResultMapperTest {

    private ExamResultMapper examResultMapper;

    @BeforeEach
    void setUp() {
        examResultMapper = new ExamResultMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getExamResultSample1();
        var actual = examResultMapper.toEntity(examResultMapper.toDto(expected));
        assertExamResultAllPropertiesEquals(expected, actual);
    }
}
