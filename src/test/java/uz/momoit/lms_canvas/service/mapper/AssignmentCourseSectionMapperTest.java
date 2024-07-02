package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AssignmentCourseSectionAsserts.*;
import static uz.momoit.lms_canvas.domain.AssignmentCourseSectionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssignmentCourseSectionMapperTest {

    private AssignmentCourseSectionMapper assignmentCourseSectionMapper;

    @BeforeEach
    void setUp() {
        assignmentCourseSectionMapper = new AssignmentCourseSectionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAssignmentCourseSectionSample1();
        var actual = assignmentCourseSectionMapper.toEntity(assignmentCourseSectionMapper.toDto(expected));
        assertAssignmentCourseSectionAllPropertiesEquals(expected, actual);
    }
}
