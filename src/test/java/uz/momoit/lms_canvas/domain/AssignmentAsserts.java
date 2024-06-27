package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class AssignmentAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentAllPropertiesEquals(Assignment expected, Assignment actual) {
        assertAssignmentAutoGeneratedPropertiesEquals(expected, actual);
        assertAssignmentAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentAllUpdatablePropertiesEquals(Assignment expected, Assignment actual) {
        assertAssignmentUpdatableFieldsEquals(expected, actual);
        assertAssignmentUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentAutoGeneratedPropertiesEquals(Assignment expected, Assignment actual) {
        assertThat(expected)
            .as("Verify Assignment auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentUpdatableFieldsEquals(Assignment expected, Assignment actual) {
        assertThat(expected)
            .as("Verify Assignment relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getContent()).as("check content").isEqualTo(actual.getContent()))
            .satisfies(e -> assertThat(e.getPoints()).as("check points").isEqualTo(actual.getPoints()))
            .satisfies(e -> assertThat(e.getSubmissionType()).as("check submissionType").isEqualTo(actual.getSubmissionType()))
            .satisfies(e -> assertThat(e.getAllowedAttempts()).as("check allowedAttempts").isEqualTo(actual.getAllowedAttempts()))
            .satisfies(e -> assertThat(e.getStartDate()).as("check startDate").isEqualTo(actual.getStartDate()))
            .satisfies(e -> assertThat(e.getEndDate()).as("check endDate").isEqualTo(actual.getEndDate()))
            .satisfies(e -> assertThat(e.getDueDate()).as("check dueDate").isEqualTo(actual.getDueDate()))
            .satisfies(e -> assertThat(e.getPublished()).as("check published").isEqualTo(actual.getPublished()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentUpdatableRelationshipsEquals(Assignment expected, Assignment actual) {
        assertThat(expected)
            .as("Verify Assignment relationships")
            .satisfies(e -> assertThat(e.getCourse()).as("check course").isEqualTo(actual.getCourse()))
            .satisfies(e -> assertThat(e.getCourseSections()).as("check courseSections").isEqualTo(actual.getCourseSections()));
    }
}
