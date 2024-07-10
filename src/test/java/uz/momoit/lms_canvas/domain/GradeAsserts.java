package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class GradeAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertGradeAllPropertiesEquals(Grade expected, Grade actual) {
        assertGradeAutoGeneratedPropertiesEquals(expected, actual);
        assertGradeAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertGradeAllUpdatablePropertiesEquals(Grade expected, Grade actual) {
        assertGradeUpdatableFieldsEquals(expected, actual);
        assertGradeUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertGradeAutoGeneratedPropertiesEquals(Grade expected, Grade actual) {
        assertThat(expected)
            .as("Verify Grade auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertGradeUpdatableFieldsEquals(Grade expected, Grade actual) {
        assertThat(expected)
            .as("Verify Grade relevant properties")
            .satisfies(e -> assertThat(e.getPoint()).as("check point").isEqualTo(actual.getPoint()))
            .satisfies(e -> assertThat(e.getGradedDate()).as("check gradedDate").isEqualTo(actual.getGradedDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertGradeUpdatableRelationshipsEquals(Grade expected, Grade actual) {
        assertThat(expected)
            .as("Verify Grade relationships")
            .satisfies(
                e -> assertThat(e.getSubmissionAssignment()).as("check submissionAssignment").isEqualTo(actual.getSubmissionAssignment())
            )
            .satisfies(e -> assertThat(e.getTeacher()).as("check teacher").isEqualTo(actual.getTeacher()))
            .satisfies(e -> assertThat(e.getAssignment()).as("check assignment").isEqualTo(actual.getAssignment()));
    }
}
