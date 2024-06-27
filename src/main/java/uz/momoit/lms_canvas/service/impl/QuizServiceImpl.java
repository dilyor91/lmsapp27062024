package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Quiz;
import uz.momoit.lms_canvas.repository.QuizRepository;
import uz.momoit.lms_canvas.service.QuizService;
import uz.momoit.lms_canvas.service.dto.QuizDTO;
import uz.momoit.lms_canvas.service.mapper.QuizMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Quiz}.
 */
@Service
@Transactional
public class QuizServiceImpl implements QuizService {

    private static final Logger log = LoggerFactory.getLogger(QuizServiceImpl.class);

    private final QuizRepository quizRepository;

    private final QuizMapper quizMapper;

    public QuizServiceImpl(QuizRepository quizRepository, QuizMapper quizMapper) {
        this.quizRepository = quizRepository;
        this.quizMapper = quizMapper;
    }

    @Override
    public QuizDTO save(QuizDTO quizDTO) {
        log.debug("Request to save Quiz : {}", quizDTO);
        Quiz quiz = quizMapper.toEntity(quizDTO);
        quiz = quizRepository.save(quiz);
        return quizMapper.toDto(quiz);
    }

    @Override
    public QuizDTO update(QuizDTO quizDTO) {
        log.debug("Request to update Quiz : {}", quizDTO);
        Quiz quiz = quizMapper.toEntity(quizDTO);
        quiz = quizRepository.save(quiz);
        return quizMapper.toDto(quiz);
    }

    @Override
    public Optional<QuizDTO> partialUpdate(QuizDTO quizDTO) {
        log.debug("Request to partially update Quiz : {}", quizDTO);

        return quizRepository
            .findById(quizDTO.getId())
            .map(existingQuiz -> {
                quizMapper.partialUpdate(existingQuiz, quizDTO);

                return existingQuiz;
            })
            .map(quizRepository::save)
            .map(quizMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuizDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Quizzes");
        return quizRepository.findAll(pageable).map(quizMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<QuizDTO> findOne(Long id) {
        log.debug("Request to get Quiz : {}", id);
        return quizRepository.findById(id).map(quizMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Quiz : {}", id);
        quizRepository.deleteById(id);
    }
}
