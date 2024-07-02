package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class AssignmentCourseSectionAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentCourseSectionAllPropertiesEquals(AssignmentCourseSection expected, AssignmentCourseSection actual) {
        assertAssignmentCourseSectionAutoGeneratedPropertiesEquals(expected, actual);
        assertAssignmentCourseSectionAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentCourseSectionAllUpdatablePropertiesEquals(
        AssignmentCourseSection expected,
        AssignmentCourseSection actual
    ) {
        assertAssignmentCourseSectionUpdatableFieldsEquals(expected, actual);
        assertAssignmentCourseSectionUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentCourseSectionAutoGeneratedPropertiesEquals(
        AssignmentCourseSection expected,
        AssignmentCourseSection actual
    ) {
        assertThat(expected)
            .as("Verify AssignmentCourseSection auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentCourseSectionUpdatableFieldsEquals(
        AssignmentCourseSection expected,
        AssignmentCourseSection actual
    ) {
        assertThat(expected)
            .as("Verify AssignmentCourseSection relevant properties")
            .satisfies(e -> assertThat(e.getStartDate()).as("check startDate").isEqualTo(actual.getStartDate()))
            .satisfies(e -> assertThat(e.getEndDate()).as("check endDate").isEqualTo(actual.getEndDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertAssignmentCourseSectionUpdatableRelationshipsEquals(
        AssignmentCourseSection expected,
        AssignmentCourseSection actual
    ) {
        assertThat(expected)
            .as("Verify AssignmentCourseSection relationships")
            .satisfies(e -> assertThat(e.getAssignment()).as("check assignment").isEqualTo(actual.getAssignment()))
            .satisfies(e -> assertThat(e.getCourse()).as("check course").isEqualTo(actual.getCourse()))
            .satisfies(e -> assertThat(e.getCourseSection()).as("check courseSection").isEqualTo(actual.getCourseSection()));
    }
}
