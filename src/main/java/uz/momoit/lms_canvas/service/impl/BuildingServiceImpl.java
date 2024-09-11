package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Building;
import uz.momoit.lms_canvas.repository.BuildingRepository;
import uz.momoit.lms_canvas.service.BuildingService;
import uz.momoit.lms_canvas.service.dto.BuildingDTO;
import uz.momoit.lms_canvas.service.mapper.BuildingMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Building}.
 */
@Service
@Transactional
public class BuildingServiceImpl implements BuildingService {

    private static final Logger LOG = LoggerFactory.getLogger(BuildingServiceImpl.class);

    private final BuildingRepository buildingRepository;

    private final BuildingMapper buildingMapper;

    public BuildingServiceImpl(BuildingRepository buildingRepository, BuildingMapper buildingMapper) {
        this.buildingRepository = buildingRepository;
        this.buildingMapper = buildingMapper;
    }

    @Override
    public BuildingDTO save(BuildingDTO buildingDTO) {
        LOG.debug("Request to save Building : {}", buildingDTO);
        Building building = buildingMapper.toEntity(buildingDTO);
        building = buildingRepository.save(building);
        return buildingMapper.toDto(building);
    }

    @Override
    public BuildingDTO update(BuildingDTO buildingDTO) {
        LOG.debug("Request to update Building : {}", buildingDTO);
        Building building = buildingMapper.toEntity(buildingDTO);
        building = buildingRepository.save(building);
        return buildingMapper.toDto(building);
    }

    @Override
    public Optional<BuildingDTO> partialUpdate(BuildingDTO buildingDTO) {
        LOG.debug("Request to partially update Building : {}", buildingDTO);

        return buildingRepository
            .findById(buildingDTO.getId())
            .map(existingBuilding -> {
                buildingMapper.partialUpdate(existingBuilding, buildingDTO);

                return existingBuilding;
            })
            .map(buildingRepository::save)
            .map(buildingMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BuildingDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Buildings");
        return buildingRepository.findAll(pageable).map(buildingMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<BuildingDTO> findOne(Long id) {
        LOG.debug("Request to get Building : {}", id);
        return buildingRepository.findById(id).map(buildingMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Building : {}", id);
        buildingRepository.deleteById(id);
    }
}
