package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class StudentQuestionAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertStudentQuestionAllPropertiesEquals(StudentQuestion expected, StudentQuestion actual) {
        assertStudentQuestionAutoGeneratedPropertiesEquals(expected, actual);
        assertStudentQuestionAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertStudentQuestionAllUpdatablePropertiesEquals(StudentQuestion expected, StudentQuestion actual) {
        assertStudentQuestionUpdatableFieldsEquals(expected, actual);
        assertStudentQuestionUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertStudentQuestionAutoGeneratedPropertiesEquals(StudentQuestion expected, StudentQuestion actual) {
        assertThat(expected)
            .as("Verify StudentQuestion auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertStudentQuestionUpdatableFieldsEquals(StudentQuestion expected, StudentQuestion actual) {
        assertThat(expected)
            .as("Verify StudentQuestion relevant properties")
            .satisfies(e -> assertThat(e.getOrdNum()).as("check ordNum").isEqualTo(actual.getOrdNum()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertStudentQuestionUpdatableRelationshipsEquals(StudentQuestion expected, StudentQuestion actual) {
        assertThat(expected)
            .as("Verify StudentQuestion relationships")
            .satisfies(e -> assertThat(e.getQuizSession()).as("check quizSession").isEqualTo(actual.getQuizSession()))
            .satisfies(e -> assertThat(e.getQuestion()).as("check question").isEqualTo(actual.getQuestion()));
    }
}