package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CourseWeek;
import uz.momoit.lms_canvas.repository.CourseWeekRepository;
import uz.momoit.lms_canvas.service.CourseWeekService;
import uz.momoit.lms_canvas.service.dto.CourseWeekDTO;
import uz.momoit.lms_canvas.service.mapper.CourseWeekMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CourseWeek}.
 */
@Service
@Transactional
public class CourseWeekServiceImpl implements CourseWeekService {

    private static final Logger log = LoggerFactory.getLogger(CourseWeekServiceImpl.class);

    private final CourseWeekRepository courseWeekRepository;

    private final CourseWeekMapper courseWeekMapper;

    public CourseWeekServiceImpl(CourseWeekRepository courseWeekRepository, CourseWeekMapper courseWeekMapper) {
        this.courseWeekRepository = courseWeekRepository;
        this.courseWeekMapper = courseWeekMapper;
    }

    @Override
    public CourseWeekDTO save(CourseWeekDTO courseWeekDTO) {
        log.debug("Request to save CourseWeek : {}", courseWeekDTO);
        CourseWeek courseWeek = courseWeekMapper.toEntity(courseWeekDTO);
        courseWeek = courseWeekRepository.save(courseWeek);
        return courseWeekMapper.toDto(courseWeek);
    }

    @Override
    public CourseWeekDTO update(CourseWeekDTO courseWeekDTO) {
        log.debug("Request to update CourseWeek : {}", courseWeekDTO);
        CourseWeek courseWeek = courseWeekMapper.toEntity(courseWeekDTO);
        courseWeek = courseWeekRepository.save(courseWeek);
        return courseWeekMapper.toDto(courseWeek);
    }

    @Override
    public Optional<CourseWeekDTO> partialUpdate(CourseWeekDTO courseWeekDTO) {
        log.debug("Request to partially update CourseWeek : {}", courseWeekDTO);

        return courseWeekRepository
            .findById(courseWeekDTO.getId())
            .map(existingCourseWeek -> {
                courseWeekMapper.partialUpdate(existingCourseWeek, courseWeekDTO);

                return existingCourseWeek;
            })
            .map(courseWeekRepository::save)
            .map(courseWeekMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CourseWeekDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CourseWeeks");
        return courseWeekRepository.findAll(pageable).map(courseWeekMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CourseWeekDTO> findOne(Long id) {
        log.debug("Request to get CourseWeek : {}", id);
        return courseWeekRepository.findById(id).map(courseWeekMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CourseWeek : {}", id);
        courseWeekRepository.deleteById(id);
    }
}
