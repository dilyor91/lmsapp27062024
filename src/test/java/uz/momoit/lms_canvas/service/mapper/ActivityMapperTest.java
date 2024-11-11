package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.ActivityAsserts.*;
import static uz.momoit.lms_canvas.domain.ActivityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ActivityMapperTest {

    private ActivityMapper activityMapper;

    @BeforeEach
    void setUp() {
        activityMapper = new ActivityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getActivitySample1();
        var actual = activityMapper.toEntity(activityMapper.toDto(expected));
        assertActivityAllPropertiesEquals(expected, actual);
    }
}
