package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.QuizSession;
import uz.momoit.lms_canvas.repository.QuizSessionRepository;
import uz.momoit.lms_canvas.service.QuizSessionService;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.service.mapper.QuizSessionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.QuizSession}.
 */
@Service
@Transactional
public class QuizSessionServiceImpl implements QuizSessionService {

    private static final Logger log = LoggerFactory.getLogger(QuizSessionServiceImpl.class);

    private final QuizSessionRepository quizSessionRepository;

    private final QuizSessionMapper quizSessionMapper;

    public QuizSessionServiceImpl(QuizSessionRepository quizSessionRepository, QuizSessionMapper quizSessionMapper) {
        this.quizSessionRepository = quizSessionRepository;
        this.quizSessionMapper = quizSessionMapper;
    }

    @Override
    public QuizSessionDTO save(QuizSessionDTO quizSessionDTO) {
        log.debug("Request to save QuizSession : {}", quizSessionDTO);
        QuizSession quizSession = quizSessionMapper.toEntity(quizSessionDTO);
        quizSession = quizSessionRepository.save(quizSession);
        return quizSessionMapper.toDto(quizSession);
    }

    @Override
    public QuizSessionDTO update(QuizSessionDTO quizSessionDTO) {
        log.debug("Request to update QuizSession : {}", quizSessionDTO);
        QuizSession quizSession = quizSessionMapper.toEntity(quizSessionDTO);
        quizSession = quizSessionRepository.save(quizSession);
        return quizSessionMapper.toDto(quizSession);
    }

    @Override
    public Optional<QuizSessionDTO> partialUpdate(QuizSessionDTO quizSessionDTO) {
        log.debug("Request to partially update QuizSession : {}", quizSessionDTO);

        return quizSessionRepository
            .findById(quizSessionDTO.getId())
            .map(existingQuizSession -> {
                quizSessionMapper.partialUpdate(existingQuizSession, quizSessionDTO);

                return existingQuizSession;
            })
            .map(quizSessionRepository::save)
            .map(quizSessionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuizSessionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all QuizSessions");
        return quizSessionRepository.findAll(pageable).map(quizSessionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuizSessionDTO> findOne(Long id) {
        log.debug("Request to get QuizSession : {}", id);
        return quizSessionRepository.findById(id).map(quizSessionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete QuizSession : {}", id);
        quizSessionRepository.deleteById(id);
    }
}
