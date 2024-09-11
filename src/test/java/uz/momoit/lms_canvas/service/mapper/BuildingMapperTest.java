package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.BuildingAsserts.*;
import static uz.momoit.lms_canvas.domain.BuildingTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BuildingMapperTest {

    private BuildingMapper buildingMapper;

    @BeforeEach
    void setUp() {
        buildingMapper = new BuildingMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBuildingSample1();
        var actual = buildingMapper.toEntity(buildingMapper.toDto(expected));
        assertBuildingAllPropertiesEquals(expected, actual);
    }
}
