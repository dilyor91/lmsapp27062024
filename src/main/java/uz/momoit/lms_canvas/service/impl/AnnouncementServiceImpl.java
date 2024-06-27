package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.repository.AnnouncementRepository;
import uz.momoit.lms_canvas.service.AnnouncementService;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.mapper.AnnouncementMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Announcement}.
 */
@Service
@Transactional
public class AnnouncementServiceImpl implements AnnouncementService {

    private static final Logger log = LoggerFactory.getLogger(AnnouncementServiceImpl.class);

    private final AnnouncementRepository announcementRepository;

    private final AnnouncementMapper announcementMapper;

    public AnnouncementServiceImpl(AnnouncementRepository announcementRepository, AnnouncementMapper announcementMapper) {
        this.announcementRepository = announcementRepository;
        this.announcementMapper = announcementMapper;
    }

    @Override
    public AnnouncementDTO save(AnnouncementDTO announcementDTO) {
        log.debug("Request to save Announcement : {}", announcementDTO);
        Announcement announcement = announcementMapper.toEntity(announcementDTO);
        announcement = announcementRepository.save(announcement);
        return announcementMapper.toDto(announcement);
    }

    @Override
    public AnnouncementDTO update(AnnouncementDTO announcementDTO) {
        log.debug("Request to update Announcement : {}", announcementDTO);
        Announcement announcement = announcementMapper.toEntity(announcementDTO);
        announcement = announcementRepository.save(announcement);
        return announcementMapper.toDto(announcement);
    }

    @Override
    public Optional<AnnouncementDTO> partialUpdate(AnnouncementDTO announcementDTO) {
        log.debug("Request to partially update Announcement : {}", announcementDTO);

        return announcementRepository
            .findById(announcementDTO.getId())
            .map(existingAnnouncement -> {
                announcementMapper.partialUpdate(existingAnnouncement, announcementDTO);

                return existingAnnouncement;
            })
            .map(announcementRepository::save)
            .map(announcementMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AnnouncementDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Announcements");
        return announcementRepository.findAll(pageable).map(announcementMapper::toDto);
    }

    public Page<AnnouncementDTO> findAllWithEagerRelationships(Pageable pageable) {
        return announcementRepository.findAllWithEagerRelationships(pageable).map(announcementMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AnnouncementDTO> findOne(Long id) {
        log.debug("Request to get Announcement : {}", id);
        return announcementRepository.findOneWithEagerRelationships(id).map(announcementMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Announcement : {}", id);
        announcementRepository.deleteById(id);
    }
}
