package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CourseSectionAsserts.*;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourseSectionMapperTest {

    private CourseSectionMapper courseSectionMapper;

    @BeforeEach
    void setUp() {
        courseSectionMapper = new CourseSectionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourseSectionSample1();
        var actual = courseSectionMapper.toEntity(courseSectionMapper.toDto(expected));
        assertCourseSectionAllPropertiesEquals(expected, actual);
    }
}
