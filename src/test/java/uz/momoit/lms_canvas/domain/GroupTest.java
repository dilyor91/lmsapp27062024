package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.GroupTestSamples.*;
import static uz.momoit.lms_canvas.domain.SpecialityTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class GroupTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Group.class);
        Group group1 = getGroupSample1();
        Group group2 = new Group();
        assertThat(group1).isNotEqualTo(group2);

        group2.setId(group1.getId());
        assertThat(group1).isEqualTo(group2);

        group2 = getGroupSample2();
        assertThat(group1).isNotEqualTo(group2);
    }

    @Test
    void specialityTest() {
        Group group = getGroupRandomSampleGenerator();
        Speciality specialityBack = getSpecialityRandomSampleGenerator();

        group.setSpeciality(specialityBack);
        assertThat(group.getSpeciality()).isEqualTo(specialityBack);

        group.speciality(null);
        assertThat(group.getSpeciality()).isNull();
    }
}
