package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CourseWeekAsserts.*;
import static uz.momoit.lms_canvas.domain.CourseWeekTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourseWeekMapperTest {

    private CourseWeekMapper courseWeekMapper;

    @BeforeEach
    void setUp() {
        courseWeekMapper = new CourseWeekMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourseWeekSample1();
        var actual = courseWeekMapper.toEntity(courseWeekMapper.toDto(expected));
        assertCourseWeekAllPropertiesEquals(expected, actual);
    }
}
