package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CourseAsserts.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourseMapperTest {

    private CourseMapper courseMapper;

    @BeforeEach
    void setUp() {
        courseMapper = new CourseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourseSample1();
        var actual = courseMapper.toEntity(courseMapper.toDto(expected));
        assertCourseAllPropertiesEquals(expected, actual);
    }
}
