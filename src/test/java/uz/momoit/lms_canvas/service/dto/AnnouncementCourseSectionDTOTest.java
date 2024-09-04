package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AnnouncementCourseSectionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnouncementCourseSectionDTO.class);
        AnnouncementCourseSectionDTO announcementCourseSectionDTO1 = new AnnouncementCourseSectionDTO();
        announcementCourseSectionDTO1.setId(1L);
        AnnouncementCourseSectionDTO announcementCourseSectionDTO2 = new AnnouncementCourseSectionDTO();
        assertThat(announcementCourseSectionDTO1).isNotEqualTo(announcementCourseSectionDTO2);
        announcementCourseSectionDTO2.setId(announcementCourseSectionDTO1.getId());
        assertThat(announcementCourseSectionDTO1).isEqualTo(announcementCourseSectionDTO2);
        announcementCourseSectionDTO2.setId(2L);
        assertThat(announcementCourseSectionDTO1).isNotEqualTo(announcementCourseSectionDTO2);
        announcementCourseSectionDTO1.setId(null);
        assertThat(announcementCourseSectionDTO1).isNotEqualTo(announcementCourseSectionDTO2);
    }
}
