package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.LessonAsserts.*;
import static uz.momoit.lms_canvas.domain.LessonTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LessonMapperTest {

    private LessonMapper lessonMapper;

    @BeforeEach
    void setUp() {
        lessonMapper = new LessonMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLessonSample1();
        var actual = lessonMapper.toEntity(lessonMapper.toDto(expected));
        assertLessonAllPropertiesEquals(expected, actual);
    }
}
