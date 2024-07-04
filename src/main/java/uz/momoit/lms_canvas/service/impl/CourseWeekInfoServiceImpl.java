package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CourseWeekInfo;
import uz.momoit.lms_canvas.repository.CourseWeekInfoRepository;
import uz.momoit.lms_canvas.service.CourseWeekInfoService;
import uz.momoit.lms_canvas.service.dto.CourseWeekInfoDTO;
import uz.momoit.lms_canvas.service.mapper.CourseWeekInfoMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CourseWeekInfo}.
 */
@Service
@Transactional
public class CourseWeekInfoServiceImpl implements CourseWeekInfoService {

    private static final Logger log = LoggerFactory.getLogger(CourseWeekInfoServiceImpl.class);

    private final CourseWeekInfoRepository courseWeekInfoRepository;

    private final CourseWeekInfoMapper courseWeekInfoMapper;

    public CourseWeekInfoServiceImpl(CourseWeekInfoRepository courseWeekInfoRepository, CourseWeekInfoMapper courseWeekInfoMapper) {
        this.courseWeekInfoRepository = courseWeekInfoRepository;
        this.courseWeekInfoMapper = courseWeekInfoMapper;
    }

    @Override
    public CourseWeekInfoDTO save(CourseWeekInfoDTO courseWeekInfoDTO) {
        log.debug("Request to save CourseWeekInfo : {}", courseWeekInfoDTO);
        CourseWeekInfo courseWeekInfo = courseWeekInfoMapper.toEntity(courseWeekInfoDTO);
        courseWeekInfo = courseWeekInfoRepository.save(courseWeekInfo);
        return courseWeekInfoMapper.toDto(courseWeekInfo);
    }

    @Override
    public CourseWeekInfoDTO update(CourseWeekInfoDTO courseWeekInfoDTO) {
        log.debug("Request to update CourseWeekInfo : {}", courseWeekInfoDTO);
        CourseWeekInfo courseWeekInfo = courseWeekInfoMapper.toEntity(courseWeekInfoDTO);
        courseWeekInfo = courseWeekInfoRepository.save(courseWeekInfo);
        return courseWeekInfoMapper.toDto(courseWeekInfo);
    }

    @Override
    public Optional<CourseWeekInfoDTO> partialUpdate(CourseWeekInfoDTO courseWeekInfoDTO) {
        log.debug("Request to partially update CourseWeekInfo : {}", courseWeekInfoDTO);

        return courseWeekInfoRepository
            .findById(courseWeekInfoDTO.getId())
            .map(existingCourseWeekInfo -> {
                courseWeekInfoMapper.partialUpdate(existingCourseWeekInfo, courseWeekInfoDTO);

                return existingCourseWeekInfo;
            })
            .map(courseWeekInfoRepository::save)
            .map(courseWeekInfoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CourseWeekInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CourseWeekInfos");
        return courseWeekInfoRepository.findAll(pageable).map(courseWeekInfoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CourseWeekInfoDTO> findOne(Long id) {
        log.debug("Request to get CourseWeekInfo : {}", id);
        return courseWeekInfoRepository.findById(id).map(courseWeekInfoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CourseWeekInfo : {}", id);
        courseWeekInfoRepository.deleteById(id);
    }
}
