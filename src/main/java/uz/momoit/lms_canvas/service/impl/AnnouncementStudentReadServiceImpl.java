package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.AnnouncementStudentRead;
import uz.momoit.lms_canvas.repository.AnnouncementStudentReadRepository;
import uz.momoit.lms_canvas.service.AnnouncementStudentReadService;
import uz.momoit.lms_canvas.service.dto.AnnouncementStudentReadDTO;
import uz.momoit.lms_canvas.service.mapper.AnnouncementStudentReadMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.AnnouncementStudentRead}.
 */
@Service
@Transactional
public class AnnouncementStudentReadServiceImpl implements AnnouncementStudentReadService {

    private static final Logger LOG = LoggerFactory.getLogger(AnnouncementStudentReadServiceImpl.class);

    private final AnnouncementStudentReadRepository announcementStudentReadRepository;

    private final AnnouncementStudentReadMapper announcementStudentReadMapper;

    public AnnouncementStudentReadServiceImpl(
        AnnouncementStudentReadRepository announcementStudentReadRepository,
        AnnouncementStudentReadMapper announcementStudentReadMapper
    ) {
        this.announcementStudentReadRepository = announcementStudentReadRepository;
        this.announcementStudentReadMapper = announcementStudentReadMapper;
    }

    @Override
    public AnnouncementStudentReadDTO save(AnnouncementStudentReadDTO announcementStudentReadDTO) {
        LOG.debug("Request to save AnnouncementStudentRead : {}", announcementStudentReadDTO);
        AnnouncementStudentRead announcementStudentRead = announcementStudentReadMapper.toEntity(announcementStudentReadDTO);
        announcementStudentRead = announcementStudentReadRepository.save(announcementStudentRead);
        return announcementStudentReadMapper.toDto(announcementStudentRead);
    }

    @Override
    public AnnouncementStudentReadDTO update(AnnouncementStudentReadDTO announcementStudentReadDTO) {
        LOG.debug("Request to update AnnouncementStudentRead : {}", announcementStudentReadDTO);
        AnnouncementStudentRead announcementStudentRead = announcementStudentReadMapper.toEntity(announcementStudentReadDTO);
        announcementStudentRead = announcementStudentReadRepository.save(announcementStudentRead);
        return announcementStudentReadMapper.toDto(announcementStudentRead);
    }

    @Override
    public Optional<AnnouncementStudentReadDTO> partialUpdate(AnnouncementStudentReadDTO announcementStudentReadDTO) {
        LOG.debug("Request to partially update AnnouncementStudentRead : {}", announcementStudentReadDTO);

        return announcementStudentReadRepository
            .findById(announcementStudentReadDTO.getId())
            .map(existingAnnouncementStudentRead -> {
                announcementStudentReadMapper.partialUpdate(existingAnnouncementStudentRead, announcementStudentReadDTO);

                return existingAnnouncementStudentRead;
            })
            .map(announcementStudentReadRepository::save)
            .map(announcementStudentReadMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AnnouncementStudentReadDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all AnnouncementStudentReads");
        return announcementStudentReadRepository.findAll(pageable).map(announcementStudentReadMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AnnouncementStudentReadDTO> findOne(Long id) {
        LOG.debug("Request to get AnnouncementStudentRead : {}", id);
        return announcementStudentReadRepository.findById(id).map(announcementStudentReadMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete AnnouncementStudentRead : {}", id);
        announcementStudentReadRepository.deleteById(id);
    }
}
