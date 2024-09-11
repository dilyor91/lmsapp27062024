package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.BuildingTestSamples.*;
import static uz.momoit.lms_canvas.domain.FacultyTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class BuildingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Building.class);
        Building building1 = getBuildingSample1();
        Building building2 = new Building();
        assertThat(building1).isNotEqualTo(building2);

        building2.setId(building1.getId());
        assertThat(building1).isEqualTo(building2);

        building2 = getBuildingSample2();
        assertThat(building1).isNotEqualTo(building2);
    }

    @Test
    void facultyTest() {
        Building building = getBuildingRandomSampleGenerator();
        Faculty facultyBack = getFacultyRandomSampleGenerator();

        building.setFaculty(facultyBack);
        assertThat(building.getFaculty()).isEqualTo(facultyBack);

        building.faculty(null);
        assertThat(building.getFaculty()).isNull();
    }
}
