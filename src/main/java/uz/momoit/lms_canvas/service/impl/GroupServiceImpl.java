package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Group;
import uz.momoit.lms_canvas.repository.GroupRepository;
import uz.momoit.lms_canvas.service.GroupService;
import uz.momoit.lms_canvas.service.dto.GroupDTO;
import uz.momoit.lms_canvas.service.mapper.GroupMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Group}.
 */
@Service
@Transactional
public class GroupServiceImpl implements GroupService {

    private static final Logger log = LoggerFactory.getLogger(GroupServiceImpl.class);

    private final GroupRepository groupRepository;

    private final GroupMapper groupMapper;

    public GroupServiceImpl(GroupRepository groupRepository, GroupMapper groupMapper) {
        this.groupRepository = groupRepository;
        this.groupMapper = groupMapper;
    }

    @Override
    public GroupDTO save(GroupDTO groupDTO) {
        log.debug("Request to save Group : {}", groupDTO);
        Group group = groupMapper.toEntity(groupDTO);
        group = groupRepository.save(group);
        return groupMapper.toDto(group);
    }

    @Override
    public GroupDTO update(GroupDTO groupDTO) {
        log.debug("Request to update Group : {}", groupDTO);
        Group group = groupMapper.toEntity(groupDTO);
        group = groupRepository.save(group);
        return groupMapper.toDto(group);
    }

    @Override
    public Optional<GroupDTO> partialUpdate(GroupDTO groupDTO) {
        log.debug("Request to partially update Group : {}", groupDTO);

        return groupRepository
            .findById(groupDTO.getId())
            .map(existingGroup -> {
                groupMapper.partialUpdate(existingGroup, groupDTO);

                return existingGroup;
            })
            .map(groupRepository::save)
            .map(groupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<GroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Groups");
        return groupRepository.findAll(pageable).map(groupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<GroupDTO> findOne(Long id) {
        log.debug("Request to get Group : {}", id);
        return groupRepository.findById(id).map(groupMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Group : {}", id);
        groupRepository.deleteById(id);
    }
}
