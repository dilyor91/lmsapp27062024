package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class RoomAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRoomAllPropertiesEquals(Room expected, Room actual) {
        assertRoomAutoGeneratedPropertiesEquals(expected, actual);
        assertRoomAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRoomAllUpdatablePropertiesEquals(Room expected, Room actual) {
        assertRoomUpdatableFieldsEquals(expected, actual);
        assertRoomUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRoomAutoGeneratedPropertiesEquals(Room expected, Room actual) {
        assertThat(expected)
            .as("Verify Room auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRoomUpdatableFieldsEquals(Room expected, Room actual) {
        assertThat(expected)
            .as("Verify Room relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getCapacity()).as("check capacity").isEqualTo(actual.getCapacity()))
            .satisfies(e -> assertThat(e.getStatus()).as("check status").isEqualTo(actual.getStatus()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRoomUpdatableRelationshipsEquals(Room expected, Room actual) {
        assertThat(expected)
            .as("Verify Room relationships")
            .satisfies(e -> assertThat(e.getBuilding()).as("check building").isEqualTo(actual.getBuilding()));
    }
}