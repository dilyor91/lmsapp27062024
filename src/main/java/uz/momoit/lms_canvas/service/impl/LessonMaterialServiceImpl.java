package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.LessonMaterial;
import uz.momoit.lms_canvas.repository.LessonMaterialRepository;
import uz.momoit.lms_canvas.service.LessonMaterialService;
import uz.momoit.lms_canvas.service.dto.LessonMaterialDTO;
import uz.momoit.lms_canvas.service.mapper.LessonMaterialMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.LessonMaterial}.
 */
@Service
@Transactional
public class LessonMaterialServiceImpl implements LessonMaterialService {

    private static final Logger log = LoggerFactory.getLogger(LessonMaterialServiceImpl.class);

    private final LessonMaterialRepository lessonMaterialRepository;

    private final LessonMaterialMapper lessonMaterialMapper;

    public LessonMaterialServiceImpl(LessonMaterialRepository lessonMaterialRepository, LessonMaterialMapper lessonMaterialMapper) {
        this.lessonMaterialRepository = lessonMaterialRepository;
        this.lessonMaterialMapper = lessonMaterialMapper;
    }

    @Override
    public LessonMaterialDTO save(LessonMaterialDTO lessonMaterialDTO) {
        log.debug("Request to save LessonMaterial : {}", lessonMaterialDTO);
        LessonMaterial lessonMaterial = lessonMaterialMapper.toEntity(lessonMaterialDTO);
        lessonMaterial = lessonMaterialRepository.save(lessonMaterial);
        return lessonMaterialMapper.toDto(lessonMaterial);
    }

    @Override
    public LessonMaterialDTO update(LessonMaterialDTO lessonMaterialDTO) {
        log.debug("Request to update LessonMaterial : {}", lessonMaterialDTO);
        LessonMaterial lessonMaterial = lessonMaterialMapper.toEntity(lessonMaterialDTO);
        lessonMaterial = lessonMaterialRepository.save(lessonMaterial);
        return lessonMaterialMapper.toDto(lessonMaterial);
    }

    @Override
    public Optional<LessonMaterialDTO> partialUpdate(LessonMaterialDTO lessonMaterialDTO) {
        log.debug("Request to partially update LessonMaterial : {}", lessonMaterialDTO);

        return lessonMaterialRepository
            .findById(lessonMaterialDTO.getId())
            .map(existingLessonMaterial -> {
                lessonMaterialMapper.partialUpdate(existingLessonMaterial, lessonMaterialDTO);

                return existingLessonMaterial;
            })
            .map(lessonMaterialRepository::save)
            .map(lessonMaterialMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LessonMaterialDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LessonMaterials");
        return lessonMaterialRepository.findAll(pageable).map(lessonMaterialMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LessonMaterialDTO> findOne(Long id) {
        log.debug("Request to get LessonMaterial : {}", id);
        return lessonMaterialRepository.findById(id).map(lessonMaterialMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LessonMaterial : {}", id);
        lessonMaterialRepository.deleteById(id);
    }
}
