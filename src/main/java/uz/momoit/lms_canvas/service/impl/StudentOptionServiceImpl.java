package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.StudentOption;
import uz.momoit.lms_canvas.repository.StudentOptionRepository;
import uz.momoit.lms_canvas.service.StudentOptionService;
import uz.momoit.lms_canvas.service.dto.StudentOptionDTO;
import uz.momoit.lms_canvas.service.mapper.StudentOptionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.StudentOption}.
 */
@Service
@Transactional
public class StudentOptionServiceImpl implements StudentOptionService {

    private static final Logger log = LoggerFactory.getLogger(StudentOptionServiceImpl.class);

    private final StudentOptionRepository studentOptionRepository;

    private final StudentOptionMapper studentOptionMapper;

    public StudentOptionServiceImpl(StudentOptionRepository studentOptionRepository, StudentOptionMapper studentOptionMapper) {
        this.studentOptionRepository = studentOptionRepository;
        this.studentOptionMapper = studentOptionMapper;
    }

    @Override
    public StudentOptionDTO save(StudentOptionDTO studentOptionDTO) {
        log.debug("Request to save StudentOption : {}", studentOptionDTO);
        StudentOption studentOption = studentOptionMapper.toEntity(studentOptionDTO);
        studentOption = studentOptionRepository.save(studentOption);
        return studentOptionMapper.toDto(studentOption);
    }

    @Override
    public StudentOptionDTO update(StudentOptionDTO studentOptionDTO) {
        log.debug("Request to update StudentOption : {}", studentOptionDTO);
        StudentOption studentOption = studentOptionMapper.toEntity(studentOptionDTO);
        studentOption = studentOptionRepository.save(studentOption);
        return studentOptionMapper.toDto(studentOption);
    }

    @Override
    public Optional<StudentOptionDTO> partialUpdate(StudentOptionDTO studentOptionDTO) {
        log.debug("Request to partially update StudentOption : {}", studentOptionDTO);

        return studentOptionRepository
            .findById(studentOptionDTO.getId())
            .map(existingStudentOption -> {
                studentOptionMapper.partialUpdate(existingStudentOption, studentOptionDTO);

                return existingStudentOption;
            })
            .map(studentOptionRepository::save)
            .map(studentOptionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentOptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StudentOptions");
        return studentOptionRepository.findAll(pageable).map(studentOptionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudentOptionDTO> findOne(Long id) {
        log.debug("Request to get StudentOption : {}", id);
        return studentOptionRepository.findById(id).map(studentOptionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudentOption : {}", id);
        studentOptionRepository.deleteById(id);
    }
}
