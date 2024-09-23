package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.TimeTable;
import uz.momoit.lms_canvas.repository.TimeTableRepository;
import uz.momoit.lms_canvas.service.TimeTableService;
import uz.momoit.lms_canvas.service.dto.TimeTableDTO;
import uz.momoit.lms_canvas.service.mapper.TimeTableMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.TimeTable}.
 */
@Service
@Transactional
public class TimeTableServiceImpl implements TimeTableService {

    private static final Logger LOG = LoggerFactory.getLogger(TimeTableServiceImpl.class);

    private final TimeTableRepository timeTableRepository;

    private final TimeTableMapper timeTableMapper;

    public TimeTableServiceImpl(TimeTableRepository timeTableRepository, TimeTableMapper timeTableMapper) {
        this.timeTableRepository = timeTableRepository;
        this.timeTableMapper = timeTableMapper;
    }

    @Override
    public TimeTableDTO save(TimeTableDTO timeTableDTO) {
        LOG.debug("Request to save TimeTable : {}", timeTableDTO);
        TimeTable timeTable = timeTableMapper.toEntity(timeTableDTO);
        timeTable = timeTableRepository.save(timeTable);
        return timeTableMapper.toDto(timeTable);
    }

    @Override
    public TimeTableDTO update(TimeTableDTO timeTableDTO) {
        LOG.debug("Request to update TimeTable : {}", timeTableDTO);
        TimeTable timeTable = timeTableMapper.toEntity(timeTableDTO);
        timeTable = timeTableRepository.save(timeTable);
        return timeTableMapper.toDto(timeTable);
    }

    @Override
    public Optional<TimeTableDTO> partialUpdate(TimeTableDTO timeTableDTO) {
        LOG.debug("Request to partially update TimeTable : {}", timeTableDTO);

        return timeTableRepository
            .findById(timeTableDTO.getId())
            .map(existingTimeTable -> {
                timeTableMapper.partialUpdate(existingTimeTable, timeTableDTO);

                return existingTimeTable;
            })
            .map(timeTableRepository::save)
            .map(timeTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TimeTableDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all TimeTables");
        return timeTableRepository.findAll(pageable).map(timeTableMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TimeTableDTO> findOne(Long id) {
        LOG.debug("Request to get TimeTable : {}", id);
        return timeTableRepository.findById(id).map(timeTableMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete TimeTable : {}", id);
        timeTableRepository.deleteById(id);
    }
}
