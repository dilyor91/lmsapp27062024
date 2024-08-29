package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class DepartmentAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDepartmentAllPropertiesEquals(Department expected, Department actual) {
        assertDepartmentAutoGeneratedPropertiesEquals(expected, actual);
        assertDepartmentAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDepartmentAllUpdatablePropertiesEquals(Department expected, Department actual) {
        assertDepartmentUpdatableFieldsEquals(expected, actual);
        assertDepartmentUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDepartmentAutoGeneratedPropertiesEquals(Department expected, Department actual) {
        assertThat(expected)
            .as("Verify Department auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDepartmentUpdatableFieldsEquals(Department expected, Department actual) {
        assertThat(expected)
            .as("Verify Department relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDepartmentUpdatableRelationshipsEquals(Department expected, Department actual) {
        // empty method
    }
}
