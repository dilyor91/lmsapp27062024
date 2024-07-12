package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AssignmentCommentAsserts.*;
import static uz.momoit.lms_canvas.domain.AssignmentCommentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssignmentCommentMapperTest {

    private AssignmentCommentMapper assignmentCommentMapper;

    @BeforeEach
    void setUp() {
        assignmentCommentMapper = new AssignmentCommentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAssignmentCommentSample1();
        var actual = assignmentCommentMapper.toEntity(assignmentCommentMapper.toDto(expected));
        assertAssignmentCommentAllPropertiesEquals(expected, actual);
    }
}
