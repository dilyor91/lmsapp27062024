package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.GroupAsserts.*;
import static uz.momoit.lms_canvas.domain.GroupTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GroupMapperTest {

    private GroupMapper groupMapper;

    @BeforeEach
    void setUp() {
        groupMapper = new GroupMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getGroupSample1();
        var actual = groupMapper.toEntity(groupMapper.toDto(expected));
        assertGroupAllPropertiesEquals(expected, actual);
    }
}
