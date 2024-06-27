package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.QuestionGroup;
import uz.momoit.lms_canvas.repository.QuestionGroupRepository;
import uz.momoit.lms_canvas.service.QuestionGroupService;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;
import uz.momoit.lms_canvas.service.mapper.QuestionGroupMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.QuestionGroup}.
 */
@Service
@Transactional
public class QuestionGroupServiceImpl implements QuestionGroupService {

    private static final Logger log = LoggerFactory.getLogger(QuestionGroupServiceImpl.class);

    private final QuestionGroupRepository questionGroupRepository;

    private final QuestionGroupMapper questionGroupMapper;

    public QuestionGroupServiceImpl(QuestionGroupRepository questionGroupRepository, QuestionGroupMapper questionGroupMapper) {
        this.questionGroupRepository = questionGroupRepository;
        this.questionGroupMapper = questionGroupMapper;
    }

    @Override
    public QuestionGroupDTO save(QuestionGroupDTO questionGroupDTO) {
        log.debug("Request to save QuestionGroup : {}", questionGroupDTO);
        QuestionGroup questionGroup = questionGroupMapper.toEntity(questionGroupDTO);
        questionGroup = questionGroupRepository.save(questionGroup);
        return questionGroupMapper.toDto(questionGroup);
    }

    @Override
    public QuestionGroupDTO update(QuestionGroupDTO questionGroupDTO) {
        log.debug("Request to update QuestionGroup : {}", questionGroupDTO);
        QuestionGroup questionGroup = questionGroupMapper.toEntity(questionGroupDTO);
        questionGroup = questionGroupRepository.save(questionGroup);
        return questionGroupMapper.toDto(questionGroup);
    }

    @Override
    public Optional<QuestionGroupDTO> partialUpdate(QuestionGroupDTO questionGroupDTO) {
        log.debug("Request to partially update QuestionGroup : {}", questionGroupDTO);

        return questionGroupRepository
            .findById(questionGroupDTO.getId())
            .map(existingQuestionGroup -> {
                questionGroupMapper.partialUpdate(existingQuestionGroup, questionGroupDTO);

                return existingQuestionGroup;
            })
            .map(questionGroupRepository::save)
            .map(questionGroupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuestionGroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all QuestionGroups");
        return questionGroupRepository.findAll(pageable).map(questionGroupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuestionGroupDTO> findOne(Long id) {
        log.debug("Request to get QuestionGroup : {}", id);
        return questionGroupRepository.findById(id).map(questionGroupMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuestionGroup : {}", id);
        questionGroupRepository.deleteById(id);
    }
}
