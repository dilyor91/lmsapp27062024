package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.StudentAnswerQuestion;
import uz.momoit.lms_canvas.repository.StudentAnswerQuestionRepository;
import uz.momoit.lms_canvas.service.StudentAnswerQuestionService;
import uz.momoit.lms_canvas.service.dto.StudentAnswerQuestionDTO;
import uz.momoit.lms_canvas.service.mapper.StudentAnswerQuestionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.StudentAnswerQuestion}.
 */
@Service
@Transactional
public class StudentAnswerQuestionServiceImpl implements StudentAnswerQuestionService {

    private static final Logger log = LoggerFactory.getLogger(StudentAnswerQuestionServiceImpl.class);

    private final StudentAnswerQuestionRepository studentAnswerQuestionRepository;

    private final StudentAnswerQuestionMapper studentAnswerQuestionMapper;

    public StudentAnswerQuestionServiceImpl(
        StudentAnswerQuestionRepository studentAnswerQuestionRepository,
        StudentAnswerQuestionMapper studentAnswerQuestionMapper
    ) {
        this.studentAnswerQuestionRepository = studentAnswerQuestionRepository;
        this.studentAnswerQuestionMapper = studentAnswerQuestionMapper;
    }

    @Override
    public StudentAnswerQuestionDTO save(StudentAnswerQuestionDTO studentAnswerQuestionDTO) {
        log.debug("Request to save StudentAnswerQuestion : {}", studentAnswerQuestionDTO);
        StudentAnswerQuestion studentAnswerQuestion = studentAnswerQuestionMapper.toEntity(studentAnswerQuestionDTO);
        studentAnswerQuestion = studentAnswerQuestionRepository.save(studentAnswerQuestion);
        return studentAnswerQuestionMapper.toDto(studentAnswerQuestion);
    }

    @Override
    public StudentAnswerQuestionDTO update(StudentAnswerQuestionDTO studentAnswerQuestionDTO) {
        log.debug("Request to update StudentAnswerQuestion : {}", studentAnswerQuestionDTO);
        StudentAnswerQuestion studentAnswerQuestion = studentAnswerQuestionMapper.toEntity(studentAnswerQuestionDTO);
        studentAnswerQuestion = studentAnswerQuestionRepository.save(studentAnswerQuestion);
        return studentAnswerQuestionMapper.toDto(studentAnswerQuestion);
    }

    @Override
    public Optional<StudentAnswerQuestionDTO> partialUpdate(StudentAnswerQuestionDTO studentAnswerQuestionDTO) {
        log.debug("Request to partially update StudentAnswerQuestion : {}", studentAnswerQuestionDTO);

        return studentAnswerQuestionRepository
            .findById(studentAnswerQuestionDTO.getId())
            .map(existingStudentAnswerQuestion -> {
                studentAnswerQuestionMapper.partialUpdate(existingStudentAnswerQuestion, studentAnswerQuestionDTO);

                return existingStudentAnswerQuestion;
            })
            .map(studentAnswerQuestionRepository::save)
            .map(studentAnswerQuestionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentAnswerQuestionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StudentAnswerQuestions");
        return studentAnswerQuestionRepository.findAll(pageable).map(studentAnswerQuestionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudentAnswerQuestionDTO> findOne(Long id) {
        log.debug("Request to get StudentAnswerQuestion : {}", id);
        return studentAnswerQuestionRepository.findById(id).map(studentAnswerQuestionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudentAnswerQuestion : {}", id);
        studentAnswerQuestionRepository.deleteById(id);
    }
}
