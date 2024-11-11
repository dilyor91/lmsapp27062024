package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Activity;
import uz.momoit.lms_canvas.repository.ActivityRepository;
import uz.momoit.lms_canvas.service.ActivityService;
import uz.momoit.lms_canvas.service.dto.ActivityDTO;
import uz.momoit.lms_canvas.service.mapper.ActivityMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Activity}.
 */
@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {

    private static final Logger LOG = LoggerFactory.getLogger(ActivityServiceImpl.class);

    private final ActivityRepository activityRepository;

    private final ActivityMapper activityMapper;

    public ActivityServiceImpl(ActivityRepository activityRepository, ActivityMapper activityMapper) {
        this.activityRepository = activityRepository;
        this.activityMapper = activityMapper;
    }

    @Override
    public ActivityDTO save(ActivityDTO activityDTO) {
        LOG.debug("Request to save Activity : {}", activityDTO);
        Activity activity = activityMapper.toEntity(activityDTO);
        activity = activityRepository.save(activity);
        return activityMapper.toDto(activity);
    }

    @Override
    public ActivityDTO update(ActivityDTO activityDTO) {
        LOG.debug("Request to update Activity : {}", activityDTO);
        Activity activity = activityMapper.toEntity(activityDTO);
        activity = activityRepository.save(activity);
        return activityMapper.toDto(activity);
    }

    @Override
    public Optional<ActivityDTO> partialUpdate(ActivityDTO activityDTO) {
        LOG.debug("Request to partially update Activity : {}", activityDTO);

        return activityRepository
            .findById(activityDTO.getId())
            .map(existingActivity -> {
                activityMapper.partialUpdate(existingActivity, activityDTO);

                return existingActivity;
            })
            .map(activityRepository::save)
            .map(activityMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ActivityDTO> findAll() {
        LOG.debug("Request to get all Activities");
        return activityRepository.findAll().stream().map(activityMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ActivityDTO> findOne(Long id) {
        LOG.debug("Request to get Activity : {}", id);
        return activityRepository.findById(id).map(activityMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Activity : {}", id);
        activityRepository.deleteById(id);
    }
}
