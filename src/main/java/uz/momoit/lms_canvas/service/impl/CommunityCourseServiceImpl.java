package uz.momoit.lms_canvas.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CommunityCourse;
import uz.momoit.lms_canvas.repository.CommunityCourseRepository;
import uz.momoit.lms_canvas.service.CommunityCourseService;
import uz.momoit.lms_canvas.service.dto.CommunityCourseDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityCourseMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CommunityCourse}.
 */
@Service
@Transactional
public class CommunityCourseServiceImpl implements CommunityCourseService {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityCourseServiceImpl.class);

    private final CommunityCourseRepository communityCourseRepository;

    private final CommunityCourseMapper communityCourseMapper;

    public CommunityCourseServiceImpl(CommunityCourseRepository communityCourseRepository, CommunityCourseMapper communityCourseMapper) {
        this.communityCourseRepository = communityCourseRepository;
        this.communityCourseMapper = communityCourseMapper;
    }

    @Override
    public CommunityCourseDTO save(CommunityCourseDTO communityCourseDTO) {
        LOG.debug("Request to save CommunityCourse : {}", communityCourseDTO);
        CommunityCourse communityCourse = communityCourseMapper.toEntity(communityCourseDTO);
        communityCourse = communityCourseRepository.save(communityCourse);
        return communityCourseMapper.toDto(communityCourse);
    }

    @Override
    public CommunityCourseDTO update(CommunityCourseDTO communityCourseDTO) {
        LOG.debug("Request to update CommunityCourse : {}", communityCourseDTO);
        CommunityCourse communityCourse = communityCourseMapper.toEntity(communityCourseDTO);
        communityCourse = communityCourseRepository.save(communityCourse);
        return communityCourseMapper.toDto(communityCourse);
    }

    @Override
    public Optional<CommunityCourseDTO> partialUpdate(CommunityCourseDTO communityCourseDTO) {
        LOG.debug("Request to partially update CommunityCourse : {}", communityCourseDTO);

        return communityCourseRepository
            .findById(communityCourseDTO.getId())
            .map(existingCommunityCourse -> {
                communityCourseMapper.partialUpdate(existingCommunityCourse, communityCourseDTO);

                return existingCommunityCourse;
            })
            .map(communityCourseRepository::save)
            .map(communityCourseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommunityCourseDTO> findAll() {
        LOG.debug("Request to get all CommunityCourses");
        return communityCourseRepository
            .findAll()
            .stream()
            .map(communityCourseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommunityCourseDTO> findOne(Long id) {
        LOG.debug("Request to get CommunityCourse : {}", id);
        return communityCourseRepository.findById(id).map(communityCourseMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete CommunityCourse : {}", id);
        communityCourseRepository.deleteById(id);
    }
}
