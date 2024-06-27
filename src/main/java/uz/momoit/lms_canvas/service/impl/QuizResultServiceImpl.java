package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.QuizResult;
import uz.momoit.lms_canvas.repository.QuizResultRepository;
import uz.momoit.lms_canvas.service.QuizResultService;
import uz.momoit.lms_canvas.service.dto.QuizResultDTO;
import uz.momoit.lms_canvas.service.mapper.QuizResultMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.QuizResult}.
 */
@Service
@Transactional
public class QuizResultServiceImpl implements QuizResultService {

    private static final Logger log = LoggerFactory.getLogger(QuizResultServiceImpl.class);

    private final QuizResultRepository quizResultRepository;

    private final QuizResultMapper quizResultMapper;

    public QuizResultServiceImpl(QuizResultRepository quizResultRepository, QuizResultMapper quizResultMapper) {
        this.quizResultRepository = quizResultRepository;
        this.quizResultMapper = quizResultMapper;
    }

    @Override
    public QuizResultDTO save(QuizResultDTO quizResultDTO) {
        log.debug("Request to save QuizResult : {}", quizResultDTO);
        QuizResult quizResult = quizResultMapper.toEntity(quizResultDTO);
        quizResult = quizResultRepository.save(quizResult);
        return quizResultMapper.toDto(quizResult);
    }

    @Override
    public QuizResultDTO update(QuizResultDTO quizResultDTO) {
        log.debug("Request to update QuizResult : {}", quizResultDTO);
        QuizResult quizResult = quizResultMapper.toEntity(quizResultDTO);
        quizResult = quizResultRepository.save(quizResult);
        return quizResultMapper.toDto(quizResult);
    }

    @Override
    public Optional<QuizResultDTO> partialUpdate(QuizResultDTO quizResultDTO) {
        log.debug("Request to partially update QuizResult : {}", quizResultDTO);

        return quizResultRepository
            .findById(quizResultDTO.getId())
            .map(existingQuizResult -> {
                quizResultMapper.partialUpdate(existingQuizResult, quizResultDTO);

                return existingQuizResult;
            })
            .map(quizResultRepository::save)
            .map(quizResultMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuizResultDTO> findAll(Pageable pageable) {
        log.debug("Request to get all QuizResults");
        return quizResultRepository.findAll(pageable).map(quizResultMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuizResultDTO> findOne(Long id) {
        log.debug("Request to get QuizResult : {}", id);
        return quizResultRepository.findById(id).map(quizResultMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuizResult : {}", id);
        quizResultRepository.deleteById(id);
    }
}
