package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class QuizCourseSectionAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertQuizCourseSectionAllPropertiesEquals(QuizCourseSection expected, QuizCourseSection actual) {
        assertQuizCourseSectionAutoGeneratedPropertiesEquals(expected, actual);
        assertQuizCourseSectionAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertQuizCourseSectionAllUpdatablePropertiesEquals(QuizCourseSection expected, QuizCourseSection actual) {
        assertQuizCourseSectionUpdatableFieldsEquals(expected, actual);
        assertQuizCourseSectionUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertQuizCourseSectionAutoGeneratedPropertiesEquals(QuizCourseSection expected, QuizCourseSection actual) {
        assertThat(expected)
            .as("Verify QuizCourseSection auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertQuizCourseSectionUpdatableFieldsEquals(QuizCourseSection expected, QuizCourseSection actual) {
        assertThat(expected)
            .as("Verify QuizCourseSection relevant properties")
            .satisfies(e -> assertThat(e.getStartDate()).as("check startDate").isEqualTo(actual.getStartDate()))
            .satisfies(e -> assertThat(e.getEndDate()).as("check endDate").isEqualTo(actual.getEndDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertQuizCourseSectionUpdatableRelationshipsEquals(QuizCourseSection expected, QuizCourseSection actual) {
        assertThat(expected)
            .as("Verify QuizCourseSection relationships")
            .satisfies(e -> assertThat(e.getCourse()).as("check course").isEqualTo(actual.getCourse()))
            .satisfies(e -> assertThat(e.getCourseSection()).as("check courseSection").isEqualTo(actual.getCourseSection()))
            .satisfies(e -> assertThat(e.getQuiz()).as("check quiz").isEqualTo(actual.getQuiz()));
    }
}
