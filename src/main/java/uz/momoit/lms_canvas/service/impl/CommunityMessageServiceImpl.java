package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CommunityMessage;
import uz.momoit.lms_canvas.repository.CommunityMessageRepository;
import uz.momoit.lms_canvas.service.CommunityMessageService;
import uz.momoit.lms_canvas.service.dto.CommunityMessageDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityMessageMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CommunityMessage}.
 */
@Service
@Transactional
public class CommunityMessageServiceImpl implements CommunityMessageService {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityMessageServiceImpl.class);

    private final CommunityMessageRepository communityMessageRepository;

    private final CommunityMessageMapper communityMessageMapper;

    public CommunityMessageServiceImpl(
        CommunityMessageRepository communityMessageRepository,
        CommunityMessageMapper communityMessageMapper
    ) {
        this.communityMessageRepository = communityMessageRepository;
        this.communityMessageMapper = communityMessageMapper;
    }

    @Override
    public CommunityMessageDTO save(CommunityMessageDTO communityMessageDTO) {
        LOG.debug("Request to save CommunityMessage : {}", communityMessageDTO);
        CommunityMessage communityMessage = communityMessageMapper.toEntity(communityMessageDTO);
        communityMessage = communityMessageRepository.save(communityMessage);
        return communityMessageMapper.toDto(communityMessage);
    }

    @Override
    public CommunityMessageDTO update(CommunityMessageDTO communityMessageDTO) {
        LOG.debug("Request to update CommunityMessage : {}", communityMessageDTO);
        CommunityMessage communityMessage = communityMessageMapper.toEntity(communityMessageDTO);
        communityMessage = communityMessageRepository.save(communityMessage);
        return communityMessageMapper.toDto(communityMessage);
    }

    @Override
    public Optional<CommunityMessageDTO> partialUpdate(CommunityMessageDTO communityMessageDTO) {
        LOG.debug("Request to partially update CommunityMessage : {}", communityMessageDTO);

        return communityMessageRepository
            .findById(communityMessageDTO.getId())
            .map(existingCommunityMessage -> {
                communityMessageMapper.partialUpdate(existingCommunityMessage, communityMessageDTO);

                return existingCommunityMessage;
            })
            .map(communityMessageRepository::save)
            .map(communityMessageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommunityMessageDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CommunityMessages");
        return communityMessageRepository.findAll(pageable).map(communityMessageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommunityMessageDTO> findOne(Long id) {
        LOG.debug("Request to get CommunityMessage : {}", id);
        return communityMessageRepository.findById(id).map(communityMessageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete CommunityMessage : {}", id);
        communityMessageRepository.deleteById(id);
    }
}
