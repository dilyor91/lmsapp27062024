package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class FacultyAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFacultyAllPropertiesEquals(Faculty expected, Faculty actual) {
        assertFacultyAutoGeneratedPropertiesEquals(expected, actual);
        assertFacultyAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFacultyAllUpdatablePropertiesEquals(Faculty expected, Faculty actual) {
        assertFacultyUpdatableFieldsEquals(expected, actual);
        assertFacultyUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFacultyAutoGeneratedPropertiesEquals(Faculty expected, Faculty actual) {
        assertThat(expected)
            .as("Verify Faculty auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFacultyUpdatableFieldsEquals(Faculty expected, Faculty actual) {
        assertThat(expected)
            .as("Verify Faculty relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFacultyUpdatableRelationshipsEquals(Faculty expected, Faculty actual) {}
}
