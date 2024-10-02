package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.MessageToUser;
import uz.momoit.lms_canvas.repository.MessageToUserRepository;
import uz.momoit.lms_canvas.service.MessageToUserService;
import uz.momoit.lms_canvas.service.dto.MessageToUserDTO;
import uz.momoit.lms_canvas.service.mapper.MessageToUserMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.MessageToUser}.
 */
@Service
@Transactional
public class MessageToUserServiceImpl implements MessageToUserService {

    private static final Logger LOG = LoggerFactory.getLogger(MessageToUserServiceImpl.class);

    private final MessageToUserRepository messageToUserRepository;

    private final MessageToUserMapper messageToUserMapper;

    public MessageToUserServiceImpl(MessageToUserRepository messageToUserRepository, MessageToUserMapper messageToUserMapper) {
        this.messageToUserRepository = messageToUserRepository;
        this.messageToUserMapper = messageToUserMapper;
    }

    @Override
    public MessageToUserDTO save(MessageToUserDTO messageToUserDTO) {
        LOG.debug("Request to save MessageToUser : {}", messageToUserDTO);
        MessageToUser messageToUser = messageToUserMapper.toEntity(messageToUserDTO);
        messageToUser = messageToUserRepository.save(messageToUser);
        return messageToUserMapper.toDto(messageToUser);
    }

    @Override
    public MessageToUserDTO update(MessageToUserDTO messageToUserDTO) {
        LOG.debug("Request to update MessageToUser : {}", messageToUserDTO);
        MessageToUser messageToUser = messageToUserMapper.toEntity(messageToUserDTO);
        messageToUser = messageToUserRepository.save(messageToUser);
        return messageToUserMapper.toDto(messageToUser);
    }

    @Override
    public Optional<MessageToUserDTO> partialUpdate(MessageToUserDTO messageToUserDTO) {
        LOG.debug("Request to partially update MessageToUser : {}", messageToUserDTO);

        return messageToUserRepository
            .findById(messageToUserDTO.getId())
            .map(existingMessageToUser -> {
                messageToUserMapper.partialUpdate(existingMessageToUser, messageToUserDTO);

                return existingMessageToUser;
            })
            .map(messageToUserRepository::save)
            .map(messageToUserMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageToUserDTO> findAll() {
        LOG.debug("Request to get all MessageToUsers");
        return messageToUserRepository.findAll().stream().map(messageToUserMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MessageToUserDTO> findOne(Long id) {
        LOG.debug("Request to get MessageToUser : {}", id);
        return messageToUserRepository.findById(id).map(messageToUserMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete MessageToUser : {}", id);
        messageToUserRepository.deleteById(id);
    }
}
