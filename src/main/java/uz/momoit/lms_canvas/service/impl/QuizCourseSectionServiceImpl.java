package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.QuizCourseSection;
import uz.momoit.lms_canvas.repository.QuizCourseSectionRepository;
import uz.momoit.lms_canvas.service.QuizCourseSectionService;
import uz.momoit.lms_canvas.service.dto.QuizCourseSectionDTO;
import uz.momoit.lms_canvas.service.mapper.QuizCourseSectionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.QuizCourseSection}.
 */
@Service
@Transactional
public class QuizCourseSectionServiceImpl implements QuizCourseSectionService {

    private static final Logger log = LoggerFactory.getLogger(QuizCourseSectionServiceImpl.class);

    private final QuizCourseSectionRepository quizCourseSectionRepository;

    private final QuizCourseSectionMapper quizCourseSectionMapper;

    public QuizCourseSectionServiceImpl(
        QuizCourseSectionRepository quizCourseSectionRepository,
        QuizCourseSectionMapper quizCourseSectionMapper
    ) {
        this.quizCourseSectionRepository = quizCourseSectionRepository;
        this.quizCourseSectionMapper = quizCourseSectionMapper;
    }

    @Override
    public QuizCourseSectionDTO save(QuizCourseSectionDTO quizCourseSectionDTO) {
        log.debug("Request to save QuizCourseSection : {}", quizCourseSectionDTO);
        QuizCourseSection quizCourseSection = quizCourseSectionMapper.toEntity(quizCourseSectionDTO);
        quizCourseSection = quizCourseSectionRepository.save(quizCourseSection);
        return quizCourseSectionMapper.toDto(quizCourseSection);
    }

    @Override
    public QuizCourseSectionDTO update(QuizCourseSectionDTO quizCourseSectionDTO) {
        log.debug("Request to update QuizCourseSection : {}", quizCourseSectionDTO);
        QuizCourseSection quizCourseSection = quizCourseSectionMapper.toEntity(quizCourseSectionDTO);
        quizCourseSection = quizCourseSectionRepository.save(quizCourseSection);
        return quizCourseSectionMapper.toDto(quizCourseSection);
    }

    @Override
    public Optional<QuizCourseSectionDTO> partialUpdate(QuizCourseSectionDTO quizCourseSectionDTO) {
        log.debug("Request to partially update QuizCourseSection : {}", quizCourseSectionDTO);

        return quizCourseSectionRepository
            .findById(quizCourseSectionDTO.getId())
            .map(existingQuizCourseSection -> {
                quizCourseSectionMapper.partialUpdate(existingQuizCourseSection, quizCourseSectionDTO);

                return existingQuizCourseSection;
            })
            .map(quizCourseSectionRepository::save)
            .map(quizCourseSectionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuizCourseSectionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all QuizCourseSections");
        return quizCourseSectionRepository.findAll(pageable).map(quizCourseSectionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuizCourseSectionDTO> findOne(Long id) {
        log.debug("Request to get QuizCourseSection : {}", id);
        return quizCourseSectionRepository.findById(id).map(quizCourseSectionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuizCourseSection : {}", id);
        quizCourseSectionRepository.deleteById(id);
    }
}
