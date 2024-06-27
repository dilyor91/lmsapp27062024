package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.StudyAcademicYearAsserts.*;
import static uz.momoit.lms_canvas.domain.StudyAcademicYearTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StudyAcademicYearMapperTest {

    private StudyAcademicYearMapper studyAcademicYearMapper;

    @BeforeEach
    void setUp() {
        studyAcademicYearMapper = new StudyAcademicYearMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getStudyAcademicYearSample1();
        var actual = studyAcademicYearMapper.toEntity(studyAcademicYearMapper.toDto(expected));
        assertStudyAcademicYearAllPropertiesEquals(expected, actual);
    }
}
