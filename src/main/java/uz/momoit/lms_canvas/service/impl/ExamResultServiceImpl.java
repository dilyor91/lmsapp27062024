package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.ExamResult;
import uz.momoit.lms_canvas.repository.ExamResultRepository;
import uz.momoit.lms_canvas.service.ExamResultService;
import uz.momoit.lms_canvas.service.dto.ExamResultDTO;
import uz.momoit.lms_canvas.service.mapper.ExamResultMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.ExamResult}.
 */
@Service
@Transactional
public class ExamResultServiceImpl implements ExamResultService {

    private static final Logger LOG = LoggerFactory.getLogger(ExamResultServiceImpl.class);

    private final ExamResultRepository examResultRepository;

    private final ExamResultMapper examResultMapper;

    public ExamResultServiceImpl(ExamResultRepository examResultRepository, ExamResultMapper examResultMapper) {
        this.examResultRepository = examResultRepository;
        this.examResultMapper = examResultMapper;
    }

    @Override
    public ExamResultDTO save(ExamResultDTO examResultDTO) {
        LOG.debug("Request to save ExamResult : {}", examResultDTO);
        ExamResult examResult = examResultMapper.toEntity(examResultDTO);
        examResult = examResultRepository.save(examResult);
        return examResultMapper.toDto(examResult);
    }

    @Override
    public ExamResultDTO update(ExamResultDTO examResultDTO) {
        LOG.debug("Request to update ExamResult : {}", examResultDTO);
        ExamResult examResult = examResultMapper.toEntity(examResultDTO);
        examResult = examResultRepository.save(examResult);
        return examResultMapper.toDto(examResult);
    }

    @Override
    public Optional<ExamResultDTO> partialUpdate(ExamResultDTO examResultDTO) {
        LOG.debug("Request to partially update ExamResult : {}", examResultDTO);

        return examResultRepository
            .findById(examResultDTO.getId())
            .map(existingExamResult -> {
                examResultMapper.partialUpdate(existingExamResult, examResultDTO);

                return existingExamResult;
            })
            .map(examResultRepository::save)
            .map(examResultMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExamResultDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ExamResults");
        return examResultRepository.findAll(pageable).map(examResultMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ExamResultDTO> findOne(Long id) {
        LOG.debug("Request to get ExamResult : {}", id);
        return examResultRepository.findById(id).map(examResultMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete ExamResult : {}", id);
        examResultRepository.deleteById(id);
    }
}
