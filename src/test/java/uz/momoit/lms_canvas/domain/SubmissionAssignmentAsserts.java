package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class SubmissionAssignmentAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSubmissionAssignmentAllPropertiesEquals(SubmissionAssignment expected, SubmissionAssignment actual) {
        assertSubmissionAssignmentAutoGeneratedPropertiesEquals(expected, actual);
        assertSubmissionAssignmentAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSubmissionAssignmentAllUpdatablePropertiesEquals(SubmissionAssignment expected, SubmissionAssignment actual) {
        assertSubmissionAssignmentUpdatableFieldsEquals(expected, actual);
        assertSubmissionAssignmentUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSubmissionAssignmentAutoGeneratedPropertiesEquals(SubmissionAssignment expected, SubmissionAssignment actual) {
        assertThat(expected)
            .as("Verify SubmissionAssignment auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSubmissionAssignmentUpdatableFieldsEquals(SubmissionAssignment expected, SubmissionAssignment actual) {
        assertThat(expected)
            .as("Verify SubmissionAssignment relevant properties")
            .satisfies(e -> assertThat(e.getSubmissionDate()).as("check submissionDate").isEqualTo(actual.getSubmissionDate()))
            .satisfies(e -> assertThat(e.getContent()).as("check content").isEqualTo(actual.getContent()))
            .satisfies(e -> assertThat(e.getComment()).as("check comment").isEqualTo(actual.getComment()))
            .satisfies(e -> assertThat(e.getAttempsNumber()).as("check attempsNumber").isEqualTo(actual.getAttempsNumber()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSubmissionAssignmentUpdatableRelationshipsEquals(SubmissionAssignment expected, SubmissionAssignment actual) {
        assertThat(expected)
            .as("Verify SubmissionAssignment relationships")
            .satisfies(e -> assertThat(e.getStudent()).as("check student").isEqualTo(actual.getStudent()))
            .satisfies(e -> assertThat(e.getCourse()).as("check course").isEqualTo(actual.getCourse()))
            .satisfies(e -> assertThat(e.getAssignment()).as("check assignment").isEqualTo(actual.getAssignment()))
            .satisfies(e -> assertThat(e.getAttachment()).as("check attachment").isEqualTo(actual.getAttachment()));
    }
}