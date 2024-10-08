package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CommunityTag;
import uz.momoit.lms_canvas.repository.CommunityTagRepository;
import uz.momoit.lms_canvas.service.CommunityTagService;
import uz.momoit.lms_canvas.service.dto.CommunityTagDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityTagMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CommunityTag}.
 */
@Service
@Transactional
public class CommunityTagServiceImpl implements CommunityTagService {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityTagServiceImpl.class);

    private final CommunityTagRepository communityTagRepository;

    private final CommunityTagMapper communityTagMapper;

    public CommunityTagServiceImpl(CommunityTagRepository communityTagRepository, CommunityTagMapper communityTagMapper) {
        this.communityTagRepository = communityTagRepository;
        this.communityTagMapper = communityTagMapper;
    }

    @Override
    public CommunityTagDTO save(CommunityTagDTO communityTagDTO) {
        LOG.debug("Request to save CommunityTag : {}", communityTagDTO);
        CommunityTag communityTag = communityTagMapper.toEntity(communityTagDTO);
        communityTag = communityTagRepository.save(communityTag);
        return communityTagMapper.toDto(communityTag);
    }

    @Override
    public CommunityTagDTO update(CommunityTagDTO communityTagDTO) {
        LOG.debug("Request to update CommunityTag : {}", communityTagDTO);
        CommunityTag communityTag = communityTagMapper.toEntity(communityTagDTO);
        communityTag = communityTagRepository.save(communityTag);
        return communityTagMapper.toDto(communityTag);
    }

    @Override
    public Optional<CommunityTagDTO> partialUpdate(CommunityTagDTO communityTagDTO) {
        LOG.debug("Request to partially update CommunityTag : {}", communityTagDTO);

        return communityTagRepository
            .findById(communityTagDTO.getId())
            .map(existingCommunityTag -> {
                communityTagMapper.partialUpdate(existingCommunityTag, communityTagDTO);

                return existingCommunityTag;
            })
            .map(communityTagRepository::save)
            .map(communityTagMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommunityTagDTO> findAll() {
        LOG.debug("Request to get all CommunityTags");
        return communityTagRepository.findAll().stream().map(communityTagMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommunityTagDTO> findOne(Long id) {
        LOG.debug("Request to get CommunityTag : {}", id);
        return communityTagRepository.findById(id).map(communityTagMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete CommunityTag : {}", id);
        communityTagRepository.deleteById(id);
    }
}
