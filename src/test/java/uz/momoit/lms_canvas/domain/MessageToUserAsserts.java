package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class MessageToUserAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertMessageToUserAllPropertiesEquals(MessageToUser expected, MessageToUser actual) {
        assertMessageToUserAutoGeneratedPropertiesEquals(expected, actual);
        assertMessageToUserAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertMessageToUserAllUpdatablePropertiesEquals(MessageToUser expected, MessageToUser actual) {
        assertMessageToUserUpdatableFieldsEquals(expected, actual);
        assertMessageToUserUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertMessageToUserAutoGeneratedPropertiesEquals(MessageToUser expected, MessageToUser actual) {
        assertThat(expected)
            .as("Verify MessageToUser auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertMessageToUserUpdatableFieldsEquals(MessageToUser expected, MessageToUser actual) {
        assertThat(expected)
            .as("Verify MessageToUser relevant properties")
            .satisfies(e -> assertThat(e.getRead()).as("check read").isEqualTo(actual.getRead()))
            .satisfies(e -> assertThat(e.getReadAt()).as("check readAt").isEqualTo(actual.getReadAt()))
            .satisfies(e -> assertThat(e.getDeleted()).as("check deleted").isEqualTo(actual.getDeleted()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertMessageToUserUpdatableRelationshipsEquals(MessageToUser expected, MessageToUser actual) {
        assertThat(expected)
            .as("Verify MessageToUser relationships")
            .satisfies(e -> assertThat(e.getMessage()).as("check message").isEqualTo(actual.getMessage()));
    }
}