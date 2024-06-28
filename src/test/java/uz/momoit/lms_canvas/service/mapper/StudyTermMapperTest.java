package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.StudyTermAsserts.*;
import static uz.momoit.lms_canvas.domain.StudyTermTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudyTermMapperTest {

    private StudyTermMapper studyTermMapper;

    @BeforeEach
    void setUp() {
        studyTermMapper = new StudyTermMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudyTermSample1();
        var actual = studyTermMapper.toEntity(studyTermMapper.toDto(expected));
        assertStudyTermAllPropertiesEquals(expected, actual);
    }
}
