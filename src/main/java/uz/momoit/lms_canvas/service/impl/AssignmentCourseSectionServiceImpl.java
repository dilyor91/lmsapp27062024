package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.AssignmentCourseSection;
import uz.momoit.lms_canvas.repository.AssignmentCourseSectionRepository;
import uz.momoit.lms_canvas.service.AssignmentCourseSectionService;
import uz.momoit.lms_canvas.service.dto.AssignmentCourseSectionDTO;
import uz.momoit.lms_canvas.service.mapper.AssignmentCourseSectionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.AssignmentCourseSection}.
 */
@Service
@Transactional
public class AssignmentCourseSectionServiceImpl implements AssignmentCourseSectionService {

    private static final Logger LOG = LoggerFactory.getLogger(AssignmentCourseSectionServiceImpl.class);

    private final AssignmentCourseSectionRepository assignmentCourseSectionRepository;

    private final AssignmentCourseSectionMapper assignmentCourseSectionMapper;

    public AssignmentCourseSectionServiceImpl(
        AssignmentCourseSectionRepository assignmentCourseSectionRepository,
        AssignmentCourseSectionMapper assignmentCourseSectionMapper
    ) {
        this.assignmentCourseSectionRepository = assignmentCourseSectionRepository;
        this.assignmentCourseSectionMapper = assignmentCourseSectionMapper;
    }

    @Override
    public AssignmentCourseSectionDTO save(AssignmentCourseSectionDTO assignmentCourseSectionDTO) {
        LOG.debug("Request to save AssignmentCourseSection : {}", assignmentCourseSectionDTO);
        AssignmentCourseSection assignmentCourseSection = assignmentCourseSectionMapper.toEntity(assignmentCourseSectionDTO);
        assignmentCourseSection = assignmentCourseSectionRepository.save(assignmentCourseSection);
        return assignmentCourseSectionMapper.toDto(assignmentCourseSection);
    }

    @Override
    public AssignmentCourseSectionDTO update(AssignmentCourseSectionDTO assignmentCourseSectionDTO) {
        LOG.debug("Request to update AssignmentCourseSection : {}", assignmentCourseSectionDTO);
        AssignmentCourseSection assignmentCourseSection = assignmentCourseSectionMapper.toEntity(assignmentCourseSectionDTO);
        assignmentCourseSection = assignmentCourseSectionRepository.save(assignmentCourseSection);
        return assignmentCourseSectionMapper.toDto(assignmentCourseSection);
    }

    @Override
    public Optional<AssignmentCourseSectionDTO> partialUpdate(AssignmentCourseSectionDTO assignmentCourseSectionDTO) {
        LOG.debug("Request to partially update AssignmentCourseSection : {}", assignmentCourseSectionDTO);

        return assignmentCourseSectionRepository
            .findById(assignmentCourseSectionDTO.getId())
            .map(existingAssignmentCourseSection -> {
                assignmentCourseSectionMapper.partialUpdate(existingAssignmentCourseSection, assignmentCourseSectionDTO);

                return existingAssignmentCourseSection;
            })
            .map(assignmentCourseSectionRepository::save)
            .map(assignmentCourseSectionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AssignmentCourseSectionDTO> findAll() {
        LOG.debug("Request to get all AssignmentCourseSections");
        return assignmentCourseSectionRepository
            .findAll()
            .stream()
            .map(assignmentCourseSectionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AssignmentCourseSectionDTO> findOne(Long id) {
        LOG.debug("Request to get AssignmentCourseSection : {}", id);
        return assignmentCourseSectionRepository.findById(id).map(assignmentCourseSectionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete AssignmentCourseSection : {}", id);
        assignmentCourseSectionRepository.deleteById(id);
    }
}
