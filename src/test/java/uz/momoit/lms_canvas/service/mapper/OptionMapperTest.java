package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.OptionAsserts.*;
import static uz.momoit.lms_canvas.domain.OptionTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OptionMapperTest {

    private OptionMapper optionMapper;

    @BeforeEach
    void setUp() {
        optionMapper = new OptionMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getOptionSample1();
        var actual = optionMapper.toEntity(optionMapper.toDto(expected));
        assertOptionAllPropertiesEquals(expected, actual);
    }
}
