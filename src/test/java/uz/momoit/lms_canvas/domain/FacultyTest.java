package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.FacultyTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class FacultyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Faculty.class);
        Faculty faculty1 = getFacultySample1();
        Faculty faculty2 = new Faculty();
        assertThat(faculty1).isNotEqualTo(faculty2);

        faculty2.setId(faculty1.getId());
        assertThat(faculty1).isEqualTo(faculty2);

        faculty2 = getFacultySample2();
        assertThat(faculty1).isNotEqualTo(faculty2);
    }
}
