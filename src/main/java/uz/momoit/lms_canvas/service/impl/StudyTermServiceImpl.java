package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.StudyTerm;
import uz.momoit.lms_canvas.repository.StudyTermRepository;
import uz.momoit.lms_canvas.service.StudyTermService;
import uz.momoit.lms_canvas.service.dto.StudyTermDTO;
import uz.momoit.lms_canvas.service.mapper.StudyTermMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.StudyTerm}.
 */
@Service
@Transactional
public class StudyTermServiceImpl implements StudyTermService {

    private static final Logger LOG = LoggerFactory.getLogger(StudyTermServiceImpl.class);

    private final StudyTermRepository studyTermRepository;

    private final StudyTermMapper studyTermMapper;

    public StudyTermServiceImpl(StudyTermRepository studyTermRepository, StudyTermMapper studyTermMapper) {
        this.studyTermRepository = studyTermRepository;
        this.studyTermMapper = studyTermMapper;
    }

    @Override
    public StudyTermDTO save(StudyTermDTO studyTermDTO) {
        LOG.debug("Request to save StudyTerm : {}", studyTermDTO);
        StudyTerm studyTerm = studyTermMapper.toEntity(studyTermDTO);
        studyTerm = studyTermRepository.save(studyTerm);
        return studyTermMapper.toDto(studyTerm);
    }

    @Override
    public StudyTermDTO update(StudyTermDTO studyTermDTO) {
        LOG.debug("Request to update StudyTerm : {}", studyTermDTO);
        StudyTerm studyTerm = studyTermMapper.toEntity(studyTermDTO);
        studyTerm = studyTermRepository.save(studyTerm);
        return studyTermMapper.toDto(studyTerm);
    }

    @Override
    public Optional<StudyTermDTO> partialUpdate(StudyTermDTO studyTermDTO) {
        LOG.debug("Request to partially update StudyTerm : {}", studyTermDTO);

        return studyTermRepository
            .findById(studyTermDTO.getId())
            .map(existingStudyTerm -> {
                studyTermMapper.partialUpdate(existingStudyTerm, studyTermDTO);

                return existingStudyTerm;
            })
            .map(studyTermRepository::save)
            .map(studyTermMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudyTermDTO> findAll() {
        LOG.debug("Request to get all StudyTerms");
        return studyTermRepository.findAll().stream().map(studyTermMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudyTermDTO> findOne(Long id) {
        LOG.debug("Request to get StudyTerm : {}", id);
        return studyTermRepository.findById(id).map(studyTermMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete StudyTerm : {}", id);
        studyTermRepository.deleteById(id);
    }
}
