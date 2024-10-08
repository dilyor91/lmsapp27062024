package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class BuildingAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBuildingAllPropertiesEquals(Building expected, Building actual) {
        assertBuildingAutoGeneratedPropertiesEquals(expected, actual);
        assertBuildingAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBuildingAllUpdatablePropertiesEquals(Building expected, Building actual) {
        assertBuildingUpdatableFieldsEquals(expected, actual);
        assertBuildingUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBuildingAutoGeneratedPropertiesEquals(Building expected, Building actual) {
        assertThat(expected)
            .as("Verify Building auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBuildingUpdatableFieldsEquals(Building expected, Building actual) {
        assertThat(expected)
            .as("Verify Building relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getAddress()).as("check address").isEqualTo(actual.getAddress()))
            .satisfies(e -> assertThat(e.getStatus()).as("check status").isEqualTo(actual.getStatus()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBuildingUpdatableRelationshipsEquals(Building expected, Building actual) {
        assertThat(expected)
            .as("Verify Building relationships")
            .satisfies(e -> assertThat(e.getFaculty()).as("check faculty").isEqualTo(actual.getFaculty()));
    }
}
