package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Speciality;
import uz.momoit.lms_canvas.repository.SpecialityRepository;
import uz.momoit.lms_canvas.service.SpecialityService;
import uz.momoit.lms_canvas.service.dto.SpecialityDTO;
import uz.momoit.lms_canvas.service.mapper.SpecialityMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Speciality}.
 */
@Service
@Transactional
public class SpecialityServiceImpl implements SpecialityService {

    private static final Logger log = LoggerFactory.getLogger(SpecialityServiceImpl.class);

    private final SpecialityRepository specialityRepository;

    private final SpecialityMapper specialityMapper;

    public SpecialityServiceImpl(SpecialityRepository specialityRepository, SpecialityMapper specialityMapper) {
        this.specialityRepository = specialityRepository;
        this.specialityMapper = specialityMapper;
    }

    @Override
    public SpecialityDTO save(SpecialityDTO specialityDTO) {
        log.debug("Request to save Speciality : {}", specialityDTO);
        Speciality speciality = specialityMapper.toEntity(specialityDTO);
        speciality = specialityRepository.save(speciality);
        return specialityMapper.toDto(speciality);
    }

    @Override
    public SpecialityDTO update(SpecialityDTO specialityDTO) {
        log.debug("Request to update Speciality : {}", specialityDTO);
        Speciality speciality = specialityMapper.toEntity(specialityDTO);
        speciality = specialityRepository.save(speciality);
        return specialityMapper.toDto(speciality);
    }

    @Override
    public Optional<SpecialityDTO> partialUpdate(SpecialityDTO specialityDTO) {
        log.debug("Request to partially update Speciality : {}", specialityDTO);

        return specialityRepository
            .findById(specialityDTO.getId())
            .map(existingSpeciality -> {
                specialityMapper.partialUpdate(existingSpeciality, specialityDTO);

                return existingSpeciality;
            })
            .map(specialityRepository::save)
            .map(specialityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SpecialityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Specialities");
        return specialityRepository.findAll(pageable).map(specialityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SpecialityDTO> findOne(Long id) {
        log.debug("Request to get Speciality : {}", id);
        return specialityRepository.findById(id).map(specialityMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Speciality : {}", id);
        specialityRepository.deleteById(id);
    }
}
