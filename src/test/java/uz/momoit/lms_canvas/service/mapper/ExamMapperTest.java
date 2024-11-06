package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.ExamAsserts.*;
import static uz.momoit.lms_canvas.domain.ExamTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExamMapperTest {

    private ExamMapper examMapper;

    @BeforeEach
    void setUp() {
        examMapper = new ExamMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getExamSample1();
        var actual = examMapper.toEntity(examMapper.toDto(expected));
        assertExamAllPropertiesEquals(expected, actual);
    }
}
