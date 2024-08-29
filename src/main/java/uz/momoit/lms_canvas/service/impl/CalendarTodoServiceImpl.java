package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.CalendarTodo;
import uz.momoit.lms_canvas.repository.CalendarTodoRepository;
import uz.momoit.lms_canvas.service.CalendarTodoService;
import uz.momoit.lms_canvas.service.dto.CalendarTodoDTO;
import uz.momoit.lms_canvas.service.mapper.CalendarTodoMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.CalendarTodo}.
 */
@Service
@Transactional
public class CalendarTodoServiceImpl implements CalendarTodoService {

    private static final Logger LOG = LoggerFactory.getLogger(CalendarTodoServiceImpl.class);

    private final CalendarTodoRepository calendarTodoRepository;

    private final CalendarTodoMapper calendarTodoMapper;

    public CalendarTodoServiceImpl(CalendarTodoRepository calendarTodoRepository, CalendarTodoMapper calendarTodoMapper) {
        this.calendarTodoRepository = calendarTodoRepository;
        this.calendarTodoMapper = calendarTodoMapper;
    }

    @Override
    public CalendarTodoDTO save(CalendarTodoDTO calendarTodoDTO) {
        LOG.debug("Request to save CalendarTodo : {}", calendarTodoDTO);
        CalendarTodo calendarTodo = calendarTodoMapper.toEntity(calendarTodoDTO);
        calendarTodo = calendarTodoRepository.save(calendarTodo);
        return calendarTodoMapper.toDto(calendarTodo);
    }

    @Override
    public CalendarTodoDTO update(CalendarTodoDTO calendarTodoDTO) {
        LOG.debug("Request to update CalendarTodo : {}", calendarTodoDTO);
        CalendarTodo calendarTodo = calendarTodoMapper.toEntity(calendarTodoDTO);
        calendarTodo = calendarTodoRepository.save(calendarTodo);
        return calendarTodoMapper.toDto(calendarTodo);
    }

    @Override
    public Optional<CalendarTodoDTO> partialUpdate(CalendarTodoDTO calendarTodoDTO) {
        LOG.debug("Request to partially update CalendarTodo : {}", calendarTodoDTO);

        return calendarTodoRepository
            .findById(calendarTodoDTO.getId())
            .map(existingCalendarTodo -> {
                calendarTodoMapper.partialUpdate(existingCalendarTodo, calendarTodoDTO);

                return existingCalendarTodo;
            })
            .map(calendarTodoRepository::save)
            .map(calendarTodoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CalendarTodoDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all CalendarTodos");
        return calendarTodoRepository.findAll(pageable).map(calendarTodoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CalendarTodoDTO> findOne(Long id) {
        LOG.debug("Request to get CalendarTodo : {}", id);
        return calendarTodoRepository.findById(id).map(calendarTodoMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete CalendarTodo : {}", id);
        calendarTodoRepository.deleteById(id);
    }
}
