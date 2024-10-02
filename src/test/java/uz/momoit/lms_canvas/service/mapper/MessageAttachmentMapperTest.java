package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.MessageAttachmentAsserts.*;
import static uz.momoit.lms_canvas.domain.MessageAttachmentTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MessageAttachmentMapperTest {

    private MessageAttachmentMapper messageAttachmentMapper;

    @BeforeEach
    void setUp() {
        messageAttachmentMapper = new MessageAttachmentMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getMessageAttachmentSample1();
        var actual = messageAttachmentMapper.toEntity(messageAttachmentMapper.toDto(expected));
        assertMessageAttachmentAllPropertiesEquals(expected, actual);
    }
}
