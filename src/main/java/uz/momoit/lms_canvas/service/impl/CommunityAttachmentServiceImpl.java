package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CommunityAttachment;
import uz.momoit.lms_canvas.repository.CommunityAttachmentRepository;
import uz.momoit.lms_canvas.service.CommunityAttachmentService;
import uz.momoit.lms_canvas.service.dto.CommunityAttachmentDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityAttachmentMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CommunityAttachment}.
 */
@Service
@Transactional
public class CommunityAttachmentServiceImpl implements CommunityAttachmentService {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityAttachmentServiceImpl.class);

    private final CommunityAttachmentRepository communityAttachmentRepository;

    private final CommunityAttachmentMapper communityAttachmentMapper;

    public CommunityAttachmentServiceImpl(
        CommunityAttachmentRepository communityAttachmentRepository,
        CommunityAttachmentMapper communityAttachmentMapper
    ) {
        this.communityAttachmentRepository = communityAttachmentRepository;
        this.communityAttachmentMapper = communityAttachmentMapper;
    }

    @Override
    public CommunityAttachmentDTO save(CommunityAttachmentDTO communityAttachmentDTO) {
        LOG.debug("Request to save CommunityAttachment : {}", communityAttachmentDTO);
        CommunityAttachment communityAttachment = communityAttachmentMapper.toEntity(communityAttachmentDTO);
        communityAttachment = communityAttachmentRepository.save(communityAttachment);
        return communityAttachmentMapper.toDto(communityAttachment);
    }

    @Override
    public CommunityAttachmentDTO update(CommunityAttachmentDTO communityAttachmentDTO) {
        LOG.debug("Request to update CommunityAttachment : {}", communityAttachmentDTO);
        CommunityAttachment communityAttachment = communityAttachmentMapper.toEntity(communityAttachmentDTO);
        communityAttachment = communityAttachmentRepository.save(communityAttachment);
        return communityAttachmentMapper.toDto(communityAttachment);
    }

    @Override
    public Optional<CommunityAttachmentDTO> partialUpdate(CommunityAttachmentDTO communityAttachmentDTO) {
        LOG.debug("Request to partially update CommunityAttachment : {}", communityAttachmentDTO);

        return communityAttachmentRepository
            .findById(communityAttachmentDTO.getId())
            .map(existingCommunityAttachment -> {
                communityAttachmentMapper.partialUpdate(existingCommunityAttachment, communityAttachmentDTO);

                return existingCommunityAttachment;
            })
            .map(communityAttachmentRepository::save)
            .map(communityAttachmentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommunityAttachmentDTO> findAll() {
        LOG.debug("Request to get all CommunityAttachments");
        return communityAttachmentRepository
            .findAll()
            .stream()
            .map(communityAttachmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommunityAttachmentDTO> findOne(Long id) {
        LOG.debug("Request to get CommunityAttachment : {}", id);
        return communityAttachmentRepository.findById(id).map(communityAttachmentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete CommunityAttachment : {}", id);
        communityAttachmentRepository.deleteById(id);
    }
}
