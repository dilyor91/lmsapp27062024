package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Lesson;
import uz.momoit.lms_canvas.repository.LessonRepository;
import uz.momoit.lms_canvas.service.LessonService;
import uz.momoit.lms_canvas.service.dto.LessonDTO;
import uz.momoit.lms_canvas.service.mapper.LessonMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Lesson}.
 */
@Service
@Transactional
public class LessonServiceImpl implements LessonService {

    private static final Logger LOG = LoggerFactory.getLogger(LessonServiceImpl.class);

    private final LessonRepository lessonRepository;

    private final LessonMapper lessonMapper;

    public LessonServiceImpl(LessonRepository lessonRepository, LessonMapper lessonMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }

    @Override
    public LessonDTO save(LessonDTO lessonDTO) {
        LOG.debug("Request to save Lesson : {}", lessonDTO);
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toDto(lesson);
    }

    @Override
    public LessonDTO update(LessonDTO lessonDTO) {
        LOG.debug("Request to update Lesson : {}", lessonDTO);
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toDto(lesson);
    }

    @Override
    public Optional<LessonDTO> partialUpdate(LessonDTO lessonDTO) {
        LOG.debug("Request to partially update Lesson : {}", lessonDTO);

        return lessonRepository
            .findById(lessonDTO.getId())
            .map(existingLesson -> {
                lessonMapper.partialUpdate(existingLesson, lessonDTO);

                return existingLesson;
            })
            .map(lessonRepository::save)
            .map(lessonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LessonDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Lessons");
        return lessonRepository.findAll(pageable).map(lessonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LessonDTO> findOne(Long id) {
        LOG.debug("Request to get Lesson : {}", id);
        return lessonRepository.findById(id).map(lessonMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Lesson : {}", id);
        lessonRepository.deleteById(id);
    }
}
