package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CourseWeekInfoAsserts.*;
import static uz.momoit.lms_canvas.domain.CourseWeekInfoTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CourseWeekInfoMapperTest {

    private CourseWeekInfoMapper courseWeekInfoMapper;

    @BeforeEach
    void setUp() {
        courseWeekInfoMapper = new CourseWeekInfoMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCourseWeekInfoSample1();
        var actual = courseWeekInfoMapper.toEntity(courseWeekInfoMapper.toDto(expected));
        assertCourseWeekInfoAllPropertiesEquals(expected, actual);
    }
}
