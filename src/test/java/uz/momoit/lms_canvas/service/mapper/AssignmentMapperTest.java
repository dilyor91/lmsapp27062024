package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AssignmentAsserts.*;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssignmentMapperTest {

    private AssignmentMapper assignmentMapper;

    @BeforeEach
    void setUp() {
        assignmentMapper = new AssignmentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAssignmentSample1();
        var actual = assignmentMapper.toEntity(assignmentMapper.toDto(expected));
        assertAssignmentAllPropertiesEquals(expected, actual);
    }
}
