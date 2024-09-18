package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AnnouncementStudentReadDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnouncementStudentReadDTO.class);
        AnnouncementStudentReadDTO announcementStudentReadDTO1 = new AnnouncementStudentReadDTO();
        announcementStudentReadDTO1.setId(1L);
        AnnouncementStudentReadDTO announcementStudentReadDTO2 = new AnnouncementStudentReadDTO();
        assertThat(announcementStudentReadDTO1).isNotEqualTo(announcementStudentReadDTO2);
        announcementStudentReadDTO2.setId(announcementStudentReadDTO1.getId());
        assertThat(announcementStudentReadDTO1).isEqualTo(announcementStudentReadDTO2);
        announcementStudentReadDTO2.setId(2L);
        assertThat(announcementStudentReadDTO1).isNotEqualTo(announcementStudentReadDTO2);
        announcementStudentReadDTO1.setId(null);
        assertThat(announcementStudentReadDTO1).isNotEqualTo(announcementStudentReadDTO2);
    }
}
