package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.LessonMaterialAsserts.*;
import static uz.momoit.lms_canvas.domain.LessonMaterialTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LessonMaterialMapperTest {

    private LessonMaterialMapper lessonMaterialMapper;

    @BeforeEach
    void setUp() {
        lessonMaterialMapper = new LessonMaterialMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLessonMaterialSample1();
        var actual = lessonMaterialMapper.toEntity(lessonMaterialMapper.toDto(expected));
        assertLessonMaterialAllPropertiesEquals(expected, actual);
    }
}
