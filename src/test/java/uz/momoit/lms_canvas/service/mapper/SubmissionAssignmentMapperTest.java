package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.SubmissionAssignmentAsserts.*;
import static uz.momoit.lms_canvas.domain.SubmissionAssignmentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SubmissionAssignmentMapperTest {

    private SubmissionAssignmentMapper submissionAssignmentMapper;

    @BeforeEach
    void setUp() {
        submissionAssignmentMapper = new SubmissionAssignmentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getSubmissionAssignmentSample1();
        var actual = submissionAssignmentMapper.toEntity(submissionAssignmentMapper.toDto(expected));
        assertSubmissionAssignmentAllPropertiesEquals(expected, actual);
    }
}
