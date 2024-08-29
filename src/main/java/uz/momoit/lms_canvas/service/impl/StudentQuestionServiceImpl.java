package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.StudentQuestion;
import uz.momoit.lms_canvas.repository.StudentQuestionRepository;
import uz.momoit.lms_canvas.service.StudentQuestionService;
import uz.momoit.lms_canvas.service.dto.StudentQuestionDTO;
import uz.momoit.lms_canvas.service.mapper.StudentQuestionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.StudentQuestion}.
 */
@Service
@Transactional
public class StudentQuestionServiceImpl implements StudentQuestionService {

    private static final Logger LOG = LoggerFactory.getLogger(StudentQuestionServiceImpl.class);

    private final StudentQuestionRepository studentQuestionRepository;

    private final StudentQuestionMapper studentQuestionMapper;

    public StudentQuestionServiceImpl(StudentQuestionRepository studentQuestionRepository, StudentQuestionMapper studentQuestionMapper) {
        this.studentQuestionRepository = studentQuestionRepository;
        this.studentQuestionMapper = studentQuestionMapper;
    }

    @Override
    public StudentQuestionDTO save(StudentQuestionDTO studentQuestionDTO) {
        LOG.debug("Request to save StudentQuestion : {}", studentQuestionDTO);
        StudentQuestion studentQuestion = studentQuestionMapper.toEntity(studentQuestionDTO);
        studentQuestion = studentQuestionRepository.save(studentQuestion);
        return studentQuestionMapper.toDto(studentQuestion);
    }

    @Override
    public StudentQuestionDTO update(StudentQuestionDTO studentQuestionDTO) {
        LOG.debug("Request to update StudentQuestion : {}", studentQuestionDTO);
        StudentQuestion studentQuestion = studentQuestionMapper.toEntity(studentQuestionDTO);
        studentQuestion = studentQuestionRepository.save(studentQuestion);
        return studentQuestionMapper.toDto(studentQuestion);
    }

    @Override
    public Optional<StudentQuestionDTO> partialUpdate(StudentQuestionDTO studentQuestionDTO) {
        LOG.debug("Request to partially update StudentQuestion : {}", studentQuestionDTO);

        return studentQuestionRepository
            .findById(studentQuestionDTO.getId())
            .map(existingStudentQuestion -> {
                studentQuestionMapper.partialUpdate(existingStudentQuestion, studentQuestionDTO);

                return existingStudentQuestion;
            })
            .map(studentQuestionRepository::save)
            .map(studentQuestionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentQuestionDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all StudentQuestions");
        return studentQuestionRepository.findAll(pageable).map(studentQuestionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudentQuestionDTO> findOne(Long id) {
        LOG.debug("Request to get StudentQuestion : {}", id);
        return studentQuestionRepository.findById(id).map(studentQuestionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete StudentQuestion : {}", id);
        studentQuestionRepository.deleteById(id);
    }
}
