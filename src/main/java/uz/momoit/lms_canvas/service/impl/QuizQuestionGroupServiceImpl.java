package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.QuizQuestionGroup;
import uz.momoit.lms_canvas.repository.QuizQuestionGroupRepository;
import uz.momoit.lms_canvas.service.QuizQuestionGroupService;
import uz.momoit.lms_canvas.service.dto.QuizQuestionGroupDTO;
import uz.momoit.lms_canvas.service.mapper.QuizQuestionGroupMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.QuizQuestionGroup}.
 */
@Service
@Transactional
public class QuizQuestionGroupServiceImpl implements QuizQuestionGroupService {

    private static final Logger log = LoggerFactory.getLogger(QuizQuestionGroupServiceImpl.class);

    private final QuizQuestionGroupRepository quizQuestionGroupRepository;

    private final QuizQuestionGroupMapper quizQuestionGroupMapper;

    public QuizQuestionGroupServiceImpl(
        QuizQuestionGroupRepository quizQuestionGroupRepository,
        QuizQuestionGroupMapper quizQuestionGroupMapper
    ) {
        this.quizQuestionGroupRepository = quizQuestionGroupRepository;
        this.quizQuestionGroupMapper = quizQuestionGroupMapper;
    }

    @Override
    public QuizQuestionGroupDTO save(QuizQuestionGroupDTO quizQuestionGroupDTO) {
        log.debug("Request to save QuizQuestionGroup : {}", quizQuestionGroupDTO);
        QuizQuestionGroup quizQuestionGroup = quizQuestionGroupMapper.toEntity(quizQuestionGroupDTO);
        quizQuestionGroup = quizQuestionGroupRepository.save(quizQuestionGroup);
        return quizQuestionGroupMapper.toDto(quizQuestionGroup);
    }

    @Override
    public QuizQuestionGroupDTO update(QuizQuestionGroupDTO quizQuestionGroupDTO) {
        log.debug("Request to update QuizQuestionGroup : {}", quizQuestionGroupDTO);
        QuizQuestionGroup quizQuestionGroup = quizQuestionGroupMapper.toEntity(quizQuestionGroupDTO);
        quizQuestionGroup = quizQuestionGroupRepository.save(quizQuestionGroup);
        return quizQuestionGroupMapper.toDto(quizQuestionGroup);
    }

    @Override
    public Optional<QuizQuestionGroupDTO> partialUpdate(QuizQuestionGroupDTO quizQuestionGroupDTO) {
        log.debug("Request to partially update QuizQuestionGroup : {}", quizQuestionGroupDTO);

        return quizQuestionGroupRepository
            .findById(quizQuestionGroupDTO.getId())
            .map(existingQuizQuestionGroup -> {
                quizQuestionGroupMapper.partialUpdate(existingQuizQuestionGroup, quizQuestionGroupDTO);

                return existingQuizQuestionGroup;
            })
            .map(quizQuestionGroupRepository::save)
            .map(quizQuestionGroupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuizQuestionGroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all QuizQuestionGroups");
        return quizQuestionGroupRepository.findAll(pageable).map(quizQuestionGroupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuizQuestionGroupDTO> findOne(Long id) {
        log.debug("Request to get QuizQuestionGroup : {}", id);
        return quizQuestionGroupRepository.findById(id).map(quizQuestionGroupMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuizQuestionGroup : {}", id);
        quizQuestionGroupRepository.deleteById(id);
    }
}
