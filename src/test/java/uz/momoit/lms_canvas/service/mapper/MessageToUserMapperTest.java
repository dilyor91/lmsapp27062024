package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.MessageToUserAsserts.*;
import static uz.momoit.lms_canvas.domain.MessageToUserTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MessageToUserMapperTest {

    private MessageToUserMapper messageToUserMapper;

    @BeforeEach
    void setUp() {
        messageToUserMapper = new MessageToUserMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getMessageToUserSample1();
        var actual = messageToUserMapper.toEntity(messageToUserMapper.toDto(expected));
        assertMessageToUserAllPropertiesEquals(expected, actual);
    }
}
