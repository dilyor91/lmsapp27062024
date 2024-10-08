package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CommunityTagAsserts.*;
import static uz.momoit.lms_canvas.domain.CommunityTagTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CommunityTagMapperTest {

    private CommunityTagMapper communityTagMapper;

    @BeforeEach
    void setUp() {
        communityTagMapper = new CommunityTagMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCommunityTagSample1();
        var actual = communityTagMapper.toEntity(communityTagMapper.toDto(expected));
        assertCommunityTagAllPropertiesEquals(expected, actual);
    }
}
