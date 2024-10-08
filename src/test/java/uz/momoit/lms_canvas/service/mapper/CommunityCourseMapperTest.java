package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CommunityCourseAsserts.*;
import static uz.momoit.lms_canvas.domain.CommunityCourseTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CommunityCourseMapperTest {

    private CommunityCourseMapper communityCourseMapper;

    @BeforeEach
    void setUp() {
        communityCourseMapper = new CommunityCourseMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCommunityCourseSample1();
        var actual = communityCourseMapper.toEntity(communityCourseMapper.toDto(expected));
        assertCommunityCourseAllPropertiesEquals(expected, actual);
    }
}
