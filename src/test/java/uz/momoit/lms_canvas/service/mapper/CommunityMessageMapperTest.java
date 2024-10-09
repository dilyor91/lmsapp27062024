package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CommunityMessageAsserts.*;
import static uz.momoit.lms_canvas.domain.CommunityMessageTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CommunityMessageMapperTest {

    private CommunityMessageMapper communityMessageMapper;

    @BeforeEach
    void setUp() {
        communityMessageMapper = new CommunityMessageMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCommunityMessageSample1();
        var actual = communityMessageMapper.toEntity(communityMessageMapper.toDto(expected));
        assertCommunityMessageAllPropertiesEquals(expected, actual);
    }
}
