package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AnnouncementCourseSectionAsserts.*;
import static uz.momoit.lms_canvas.domain.AnnouncementCourseSectionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AnnouncementCourseSectionMapperTest {

    private AnnouncementCourseSectionMapper announcementCourseSectionMapper;

    @BeforeEach
    void setUp() {
        announcementCourseSectionMapper = new AnnouncementCourseSectionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAnnouncementCourseSectionSample1();
        var actual = announcementCourseSectionMapper.toEntity(announcementCourseSectionMapper.toDto(expected));
        assertAnnouncementCourseSectionAllPropertiesEquals(expected, actual);
    }
}
