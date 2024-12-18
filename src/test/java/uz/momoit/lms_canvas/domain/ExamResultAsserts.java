package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ExamResultAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertExamResultAllPropertiesEquals(ExamResult expected, ExamResult actual) {
        assertExamResultAutoGeneratedPropertiesEquals(expected, actual);
        assertExamResultAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertExamResultAllUpdatablePropertiesEquals(ExamResult expected, ExamResult actual) {
        assertExamResultUpdatableFieldsEquals(expected, actual);
        assertExamResultUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertExamResultAutoGeneratedPropertiesEquals(ExamResult expected, ExamResult actual) {
        assertThat(expected)
            .as("Verify ExamResult auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertExamResultUpdatableFieldsEquals(ExamResult expected, ExamResult actual) {
        assertThat(expected)
            .as("Verify ExamResult relevant properties")
            .satisfies(e -> assertThat(e.getPoint()).as("check point").isEqualTo(actual.getPoint()))
            .satisfies(e -> assertThat(e.getGradedDate()).as("check gradedDate").isEqualTo(actual.getGradedDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertExamResultUpdatableRelationshipsEquals(ExamResult expected, ExamResult actual) {
        assertThat(expected)
            .as("Verify ExamResult relationships")
            .satisfies(e -> assertThat(e.getStudent()).as("check student").isEqualTo(actual.getStudent()))
            .satisfies(e -> assertThat(e.getExam()).as("check exam").isEqualTo(actual.getExam()))
            .satisfies(e -> assertThat(e.getCourse()).as("check course").isEqualTo(actual.getCourse()));
    }
}
