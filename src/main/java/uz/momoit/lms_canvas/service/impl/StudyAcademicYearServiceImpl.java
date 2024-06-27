package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.StudyAcademicYear;
import uz.momoit.lms_canvas.repository.StudyAcademicYearRepository;
import uz.momoit.lms_canvas.service.StudyAcademicYearService;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;
import uz.momoit.lms_canvas.service.mapper.StudyAcademicYearMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.StudyAcademicYear}.
 */
@Service
@Transactional
public class StudyAcademicYearServiceImpl implements StudyAcademicYearService {

    private static final Logger log = LoggerFactory.getLogger(StudyAcademicYearServiceImpl.class);

    private final StudyAcademicYearRepository studyAcademicYearRepository;

    private final StudyAcademicYearMapper studyAcademicYearMapper;

    public StudyAcademicYearServiceImpl(
        StudyAcademicYearRepository studyAcademicYearRepository,
        StudyAcademicYearMapper studyAcademicYearMapper
    ) {
        this.studyAcademicYearRepository = studyAcademicYearRepository;
        this.studyAcademicYearMapper = studyAcademicYearMapper;
    }

    @Override
    public StudyAcademicYearDTO save(StudyAcademicYearDTO studyAcademicYearDTO) {
        log.debug("Request to save StudyAcademicYear : {}", studyAcademicYearDTO);
        StudyAcademicYear studyAcademicYear = studyAcademicYearMapper.toEntity(studyAcademicYearDTO);
        studyAcademicYear = studyAcademicYearRepository.save(studyAcademicYear);
        return studyAcademicYearMapper.toDto(studyAcademicYear);
    }

    @Override
    public StudyAcademicYearDTO update(StudyAcademicYearDTO studyAcademicYearDTO) {
        log.debug("Request to update StudyAcademicYear : {}", studyAcademicYearDTO);
        StudyAcademicYear studyAcademicYear = studyAcademicYearMapper.toEntity(studyAcademicYearDTO);
        studyAcademicYear = studyAcademicYearRepository.save(studyAcademicYear);
        return studyAcademicYearMapper.toDto(studyAcademicYear);
    }

    @Override
    public Optional<StudyAcademicYearDTO> partialUpdate(StudyAcademicYearDTO studyAcademicYearDTO) {
        log.debug("Request to partially update StudyAcademicYear : {}", studyAcademicYearDTO);

        return studyAcademicYearRepository
            .findById(studyAcademicYearDTO.getId())
            .map(existingStudyAcademicYear -> {
                studyAcademicYearMapper.partialUpdate(existingStudyAcademicYear, studyAcademicYearDTO);

                return existingStudyAcademicYear;
            })
            .map(studyAcademicYearRepository::save)
            .map(studyAcademicYearMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudyAcademicYearDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StudyAcademicYears");
        return studyAcademicYearRepository.findAll(pageable).map(studyAcademicYearMapper::toDto);
    }

    /**
     *  Get all the studyAcademicYears where Student is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<StudyAcademicYearDTO> findAllWhereStudentIsNull() {
        log.debug("Request to get all studyAcademicYears where Student is null");
        return StreamSupport.stream(studyAcademicYearRepository.findAll().spliterator(), false)
            .filter(studyAcademicYear -> studyAcademicYear.getStudent() == null)
            .map(studyAcademicYearMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudyAcademicYearDTO> findOne(Long id) {
        log.debug("Request to get StudyAcademicYear : {}", id);
        return studyAcademicYearRepository.findById(id).map(studyAcademicYearMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudyAcademicYear : {}", id);
        studyAcademicYearRepository.deleteById(id);
    }
}
