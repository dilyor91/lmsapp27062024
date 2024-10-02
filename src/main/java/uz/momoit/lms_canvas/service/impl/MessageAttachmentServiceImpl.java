package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.MessageAttachment;
import uz.momoit.lms_canvas.repository.MessageAttachmentRepository;
import uz.momoit.lms_canvas.service.MessageAttachmentService;
import uz.momoit.lms_canvas.service.dto.MessageAttachmentDTO;
import uz.momoit.lms_canvas.service.mapper.MessageAttachmentMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.MessageAttachment}.
 */
@Service
@Transactional
public class MessageAttachmentServiceImpl implements MessageAttachmentService {

    private static final Logger LOG = LoggerFactory.getLogger(MessageAttachmentServiceImpl.class);

    private final MessageAttachmentRepository messageAttachmentRepository;

    private final MessageAttachmentMapper messageAttachmentMapper;

    public MessageAttachmentServiceImpl(
        MessageAttachmentRepository messageAttachmentRepository,
        MessageAttachmentMapper messageAttachmentMapper
    ) {
        this.messageAttachmentRepository = messageAttachmentRepository;
        this.messageAttachmentMapper = messageAttachmentMapper;
    }

    @Override
    public MessageAttachmentDTO save(MessageAttachmentDTO messageAttachmentDTO) {
        LOG.debug("Request to save MessageAttachment : {}", messageAttachmentDTO);
        MessageAttachment messageAttachment = messageAttachmentMapper.toEntity(messageAttachmentDTO);
        messageAttachment = messageAttachmentRepository.save(messageAttachment);
        return messageAttachmentMapper.toDto(messageAttachment);
    }

    @Override
    public MessageAttachmentDTO update(MessageAttachmentDTO messageAttachmentDTO) {
        LOG.debug("Request to update MessageAttachment : {}", messageAttachmentDTO);
        MessageAttachment messageAttachment = messageAttachmentMapper.toEntity(messageAttachmentDTO);
        messageAttachment = messageAttachmentRepository.save(messageAttachment);
        return messageAttachmentMapper.toDto(messageAttachment);
    }

    @Override
    public Optional<MessageAttachmentDTO> partialUpdate(MessageAttachmentDTO messageAttachmentDTO) {
        LOG.debug("Request to partially update MessageAttachment : {}", messageAttachmentDTO);

        return messageAttachmentRepository
            .findById(messageAttachmentDTO.getId())
            .map(existingMessageAttachment -> {
                messageAttachmentMapper.partialUpdate(existingMessageAttachment, messageAttachmentDTO);

                return existingMessageAttachment;
            })
            .map(messageAttachmentRepository::save)
            .map(messageAttachmentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageAttachmentDTO> findAll() {
        LOG.debug("Request to get all MessageAttachments");
        return messageAttachmentRepository
            .findAll()
            .stream()
            .map(messageAttachmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MessageAttachmentDTO> findOne(Long id) {
        LOG.debug("Request to get MessageAttachment : {}", id);
        return messageAttachmentRepository.findById(id).map(messageAttachmentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete MessageAttachment : {}", id);
        messageAttachmentRepository.deleteById(id);
    }
}
