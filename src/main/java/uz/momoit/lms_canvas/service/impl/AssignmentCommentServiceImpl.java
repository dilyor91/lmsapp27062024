package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.AssignmentComment;
import uz.momoit.lms_canvas.repository.AssignmentCommentRepository;
import uz.momoit.lms_canvas.service.AssignmentCommentService;
import uz.momoit.lms_canvas.service.dto.AssignmentCommentDTO;
import uz.momoit.lms_canvas.service.mapper.AssignmentCommentMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.AssignmentComment}.
 */
@Service
@Transactional
public class AssignmentCommentServiceImpl implements AssignmentCommentService {

    private static final Logger LOG = LoggerFactory.getLogger(AssignmentCommentServiceImpl.class);

    private final AssignmentCommentRepository assignmentCommentRepository;

    private final AssignmentCommentMapper assignmentCommentMapper;

    public AssignmentCommentServiceImpl(
        AssignmentCommentRepository assignmentCommentRepository,
        AssignmentCommentMapper assignmentCommentMapper
    ) {
        this.assignmentCommentRepository = assignmentCommentRepository;
        this.assignmentCommentMapper = assignmentCommentMapper;
    }

    @Override
    public AssignmentCommentDTO save(AssignmentCommentDTO assignmentCommentDTO) {
        LOG.debug("Request to save AssignmentComment : {}", assignmentCommentDTO);
        AssignmentComment assignmentComment = assignmentCommentMapper.toEntity(assignmentCommentDTO);
        assignmentComment = assignmentCommentRepository.save(assignmentComment);
        return assignmentCommentMapper.toDto(assignmentComment);
    }

    @Override
    public AssignmentCommentDTO update(AssignmentCommentDTO assignmentCommentDTO) {
        LOG.debug("Request to update AssignmentComment : {}", assignmentCommentDTO);
        AssignmentComment assignmentComment = assignmentCommentMapper.toEntity(assignmentCommentDTO);
        assignmentComment = assignmentCommentRepository.save(assignmentComment);
        return assignmentCommentMapper.toDto(assignmentComment);
    }

    @Override
    public Optional<AssignmentCommentDTO> partialUpdate(AssignmentCommentDTO assignmentCommentDTO) {
        LOG.debug("Request to partially update AssignmentComment : {}", assignmentCommentDTO);

        return assignmentCommentRepository
            .findById(assignmentCommentDTO.getId())
            .map(existingAssignmentComment -> {
                assignmentCommentMapper.partialUpdate(existingAssignmentComment, assignmentCommentDTO);

                return existingAssignmentComment;
            })
            .map(assignmentCommentRepository::save)
            .map(assignmentCommentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AssignmentCommentDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all AssignmentComments");
        return assignmentCommentRepository.findAll(pageable).map(assignmentCommentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AssignmentCommentDTO> findOne(Long id) {
        LOG.debug("Request to get AssignmentComment : {}", id);
        return assignmentCommentRepository.findById(id).map(assignmentCommentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete AssignmentComment : {}", id);
        assignmentCommentRepository.deleteById(id);
    }
}
