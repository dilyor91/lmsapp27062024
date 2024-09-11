package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.BuildingTestSamples.*;
import static uz.momoit.lms_canvas.domain.RoomTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class RoomTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Room.class);
        Room room1 = getRoomSample1();
        Room room2 = new Room();
        assertThat(room1).isNotEqualTo(room2);

        room2.setId(room1.getId());
        assertThat(room1).isEqualTo(room2);

        room2 = getRoomSample2();
        assertThat(room1).isNotEqualTo(room2);
    }

    @Test
    void buildingTest() {
        Room room = getRoomRandomSampleGenerator();
        Building buildingBack = getBuildingRandomSampleGenerator();

        room.setBuilding(buildingBack);
        assertThat(room.getBuilding()).isEqualTo(buildingBack);

        room.building(null);
        assertThat(room.getBuilding()).isNull();
    }
}
