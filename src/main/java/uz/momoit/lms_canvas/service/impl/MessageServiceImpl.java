package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Message;
import uz.momoit.lms_canvas.repository.MessageRepository;
import uz.momoit.lms_canvas.service.MessageService;
import uz.momoit.lms_canvas.service.dto.MessageDTO;
import uz.momoit.lms_canvas.service.mapper.MessageMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Message}.
 */
@Service
@Transactional
public class MessageServiceImpl implements MessageService {

    private static final Logger LOG = LoggerFactory.getLogger(MessageServiceImpl.class);

    private final MessageRepository messageRepository;

    private final MessageMapper messageMapper;

    public MessageServiceImpl(MessageRepository messageRepository, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
    }

    @Override
    public MessageDTO save(MessageDTO messageDTO) {
        LOG.debug("Request to save Message : {}", messageDTO);
        Message message = messageMapper.toEntity(messageDTO);
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }

    @Override
    public MessageDTO update(MessageDTO messageDTO) {
        LOG.debug("Request to update Message : {}", messageDTO);
        Message message = messageMapper.toEntity(messageDTO);
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }

    @Override
    public Optional<MessageDTO> partialUpdate(MessageDTO messageDTO) {
        LOG.debug("Request to partially update Message : {}", messageDTO);

        return messageRepository
            .findById(messageDTO.getId())
            .map(existingMessage -> {
                messageMapper.partialUpdate(existingMessage, messageDTO);

                return existingMessage;
            })
            .map(messageRepository::save)
            .map(messageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageDTO> findAll() {
        LOG.debug("Request to get all Messages");
        return messageRepository.findAll().stream().map(messageMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MessageDTO> findOne(Long id) {
        LOG.debug("Request to get Message : {}", id);
        return messageRepository.findById(id).map(messageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Message : {}", id);
        messageRepository.deleteById(id);
    }
}
