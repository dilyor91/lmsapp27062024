package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CommunityAttachmentAsserts.*;
import static uz.momoit.lms_canvas.domain.CommunityAttachmentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CommunityAttachmentMapperTest {

    private CommunityAttachmentMapper communityAttachmentMapper;

    @BeforeEach
    void setUp() {
        communityAttachmentMapper = new CommunityAttachmentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCommunityAttachmentSample1();
        var actual = communityAttachmentMapper.toEntity(communityAttachmentMapper.toDto(expected));
        assertCommunityAttachmentAllPropertiesEquals(expected, actual);
    }
}
