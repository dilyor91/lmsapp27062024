package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.AnnouncementCourseSection;
import uz.momoit.lms_canvas.repository.AnnouncementCourseSectionRepository;
import uz.momoit.lms_canvas.service.AnnouncementCourseSectionService;
import uz.momoit.lms_canvas.service.dto.AnnouncementCourseSectionDTO;
import uz.momoit.lms_canvas.service.mapper.AnnouncementCourseSectionMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.AnnouncementCourseSection}.
 */
@Service
@Transactional
public class AnnouncementCourseSectionServiceImpl implements AnnouncementCourseSectionService {

    private static final Logger LOG = LoggerFactory.getLogger(AnnouncementCourseSectionServiceImpl.class);

    private final AnnouncementCourseSectionRepository announcementCourseSectionRepository;

    private final AnnouncementCourseSectionMapper announcementCourseSectionMapper;

    public AnnouncementCourseSectionServiceImpl(
        AnnouncementCourseSectionRepository announcementCourseSectionRepository,
        AnnouncementCourseSectionMapper announcementCourseSectionMapper
    ) {
        this.announcementCourseSectionRepository = announcementCourseSectionRepository;
        this.announcementCourseSectionMapper = announcementCourseSectionMapper;
    }

    @Override
    public AnnouncementCourseSectionDTO save(AnnouncementCourseSectionDTO announcementCourseSectionDTO) {
        LOG.debug("Request to save AnnouncementCourseSection : {}", announcementCourseSectionDTO);
        AnnouncementCourseSection announcementCourseSection = announcementCourseSectionMapper.toEntity(announcementCourseSectionDTO);
        announcementCourseSection = announcementCourseSectionRepository.save(announcementCourseSection);
        return announcementCourseSectionMapper.toDto(announcementCourseSection);
    }

    @Override
    public AnnouncementCourseSectionDTO update(AnnouncementCourseSectionDTO announcementCourseSectionDTO) {
        LOG.debug("Request to update AnnouncementCourseSection : {}", announcementCourseSectionDTO);
        AnnouncementCourseSection announcementCourseSection = announcementCourseSectionMapper.toEntity(announcementCourseSectionDTO);
        announcementCourseSection = announcementCourseSectionRepository.save(announcementCourseSection);
        return announcementCourseSectionMapper.toDto(announcementCourseSection);
    }

    @Override
    public Optional<AnnouncementCourseSectionDTO> partialUpdate(AnnouncementCourseSectionDTO announcementCourseSectionDTO) {
        LOG.debug("Request to partially update AnnouncementCourseSection : {}", announcementCourseSectionDTO);

        return announcementCourseSectionRepository
            .findById(announcementCourseSectionDTO.getId())
            .map(existingAnnouncementCourseSection -> {
                announcementCourseSectionMapper.partialUpdate(existingAnnouncementCourseSection, announcementCourseSectionDTO);

                return existingAnnouncementCourseSection;
            })
            .map(announcementCourseSectionRepository::save)
            .map(announcementCourseSectionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AnnouncementCourseSectionDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all AnnouncementCourseSections");
        return announcementCourseSectionRepository.findAll(pageable).map(announcementCourseSectionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AnnouncementCourseSectionDTO> findOne(Long id) {
        LOG.debug("Request to get AnnouncementCourseSection : {}", id);
        return announcementCourseSectionRepository.findById(id).map(announcementCourseSectionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete AnnouncementCourseSection : {}", id);
        announcementCourseSectionRepository.deleteById(id);
    }
}
