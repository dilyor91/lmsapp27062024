package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CalendarEvent;
import uz.momoit.lms_canvas.repository.CalendarEventRepository;
import uz.momoit.lms_canvas.service.CalendarEventService;
import uz.momoit.lms_canvas.service.dto.CalendarEventDTO;
import uz.momoit.lms_canvas.service.mapper.CalendarEventMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CalendarEvent}.
 */
@Service
@Transactional
public class CalendarEventServiceImpl implements CalendarEventService {

    private static final Logger log = LoggerFactory.getLogger(CalendarEventServiceImpl.class);

    private final CalendarEventRepository calendarEventRepository;

    private final CalendarEventMapper calendarEventMapper;

    public CalendarEventServiceImpl(CalendarEventRepository calendarEventRepository, CalendarEventMapper calendarEventMapper) {
        this.calendarEventRepository = calendarEventRepository;
        this.calendarEventMapper = calendarEventMapper;
    }

    @Override
    public CalendarEventDTO save(CalendarEventDTO calendarEventDTO) {
        log.debug("Request to save CalendarEvent : {}", calendarEventDTO);
        CalendarEvent calendarEvent = calendarEventMapper.toEntity(calendarEventDTO);
        calendarEvent = calendarEventRepository.save(calendarEvent);
        return calendarEventMapper.toDto(calendarEvent);
    }

    @Override
    public CalendarEventDTO update(CalendarEventDTO calendarEventDTO) {
        log.debug("Request to update CalendarEvent : {}", calendarEventDTO);
        CalendarEvent calendarEvent = calendarEventMapper.toEntity(calendarEventDTO);
        calendarEvent = calendarEventRepository.save(calendarEvent);
        return calendarEventMapper.toDto(calendarEvent);
    }

    @Override
    public Optional<CalendarEventDTO> partialUpdate(CalendarEventDTO calendarEventDTO) {
        log.debug("Request to partially update CalendarEvent : {}", calendarEventDTO);

        return calendarEventRepository
            .findById(calendarEventDTO.getId())
            .map(existingCalendarEvent -> {
                calendarEventMapper.partialUpdate(existingCalendarEvent, calendarEventDTO);

                return existingCalendarEvent;
            })
            .map(calendarEventRepository::save)
            .map(calendarEventMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CalendarEventDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CalendarEvents");
        return calendarEventRepository.findAll(pageable).map(calendarEventMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CalendarEventDTO> findOne(Long id) {
        log.debug("Request to get CalendarEvent : {}", id);
        return calendarEventRepository.findById(id).map(calendarEventMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CalendarEvent : {}", id);
        calendarEventRepository.deleteById(id);
    }
}
