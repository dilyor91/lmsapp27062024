package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.SubmissionAssignment;
import uz.momoit.lms_canvas.repository.SubmissionAssignmentRepository;
import uz.momoit.lms_canvas.service.SubmissionAssignmentService;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;
import uz.momoit.lms_canvas.service.mapper.SubmissionAssignmentMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.SubmissionAssignment}.
 */
@Service
@Transactional
public class SubmissionAssignmentServiceImpl implements SubmissionAssignmentService {

    private static final Logger log = LoggerFactory.getLogger(SubmissionAssignmentServiceImpl.class);

    private final SubmissionAssignmentRepository submissionAssignmentRepository;

    private final SubmissionAssignmentMapper submissionAssignmentMapper;

    public SubmissionAssignmentServiceImpl(
        SubmissionAssignmentRepository submissionAssignmentRepository,
        SubmissionAssignmentMapper submissionAssignmentMapper
    ) {
        this.submissionAssignmentRepository = submissionAssignmentRepository;
        this.submissionAssignmentMapper = submissionAssignmentMapper;
    }

    @Override
    public SubmissionAssignmentDTO save(SubmissionAssignmentDTO submissionAssignmentDTO) {
        log.debug("Request to save SubmissionAssignment : {}", submissionAssignmentDTO);
        SubmissionAssignment submissionAssignment = submissionAssignmentMapper.toEntity(submissionAssignmentDTO);
        submissionAssignment = submissionAssignmentRepository.save(submissionAssignment);
        return submissionAssignmentMapper.toDto(submissionAssignment);
    }

    @Override
    public SubmissionAssignmentDTO update(SubmissionAssignmentDTO submissionAssignmentDTO) {
        log.debug("Request to update SubmissionAssignment : {}", submissionAssignmentDTO);
        SubmissionAssignment submissionAssignment = submissionAssignmentMapper.toEntity(submissionAssignmentDTO);
        submissionAssignment = submissionAssignmentRepository.save(submissionAssignment);
        return submissionAssignmentMapper.toDto(submissionAssignment);
    }

    @Override
    public Optional<SubmissionAssignmentDTO> partialUpdate(SubmissionAssignmentDTO submissionAssignmentDTO) {
        log.debug("Request to partially update SubmissionAssignment : {}", submissionAssignmentDTO);

        return submissionAssignmentRepository
            .findById(submissionAssignmentDTO.getId())
            .map(existingSubmissionAssignment -> {
                submissionAssignmentMapper.partialUpdate(existingSubmissionAssignment, submissionAssignmentDTO);

                return existingSubmissionAssignment;
            })
            .map(submissionAssignmentRepository::save)
            .map(submissionAssignmentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SubmissionAssignmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubmissionAssignments");
        return submissionAssignmentRepository.findAll(pageable).map(submissionAssignmentMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SubmissionAssignmentDTO> findOne(Long id) {
        log.debug("Request to get SubmissionAssignment : {}", id);
        return submissionAssignmentRepository.findById(id).map(submissionAssignmentMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubmissionAssignment : {}", id);
        submissionAssignmentRepository.deleteById(id);
    }
}
