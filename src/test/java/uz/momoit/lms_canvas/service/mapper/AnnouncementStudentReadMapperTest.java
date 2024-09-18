package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AnnouncementStudentReadAsserts.*;
import static uz.momoit.lms_canvas.domain.AnnouncementStudentReadTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AnnouncementStudentReadMapperTest {

    private AnnouncementStudentReadMapper announcementStudentReadMapper;

    @BeforeEach
    void setUp() {
        announcementStudentReadMapper = new AnnouncementStudentReadMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAnnouncementStudentReadSample1();
        var actual = announcementStudentReadMapper.toEntity(announcementStudentReadMapper.toDto(expected));
        assertAnnouncementStudentReadAllPropertiesEquals(expected, actual);
    }
}
