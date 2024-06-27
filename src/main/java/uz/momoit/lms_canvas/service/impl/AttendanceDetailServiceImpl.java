package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.AttendanceDetail;
import uz.momoit.lms_canvas.repository.AttendanceDetailRepository;
import uz.momoit.lms_canvas.service.AttendanceDetailService;
import uz.momoit.lms_canvas.service.dto.AttendanceDetailDTO;
import uz.momoit.lms_canvas.service.mapper.AttendanceDetailMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.AttendanceDetail}.
 */
@Service
@Transactional
public class AttendanceDetailServiceImpl implements AttendanceDetailService {

    private static final Logger log = LoggerFactory.getLogger(AttendanceDetailServiceImpl.class);

    private final AttendanceDetailRepository attendanceDetailRepository;

    private final AttendanceDetailMapper attendanceDetailMapper;

    public AttendanceDetailServiceImpl(
        AttendanceDetailRepository attendanceDetailRepository,
        AttendanceDetailMapper attendanceDetailMapper
    ) {
        this.attendanceDetailRepository = attendanceDetailRepository;
        this.attendanceDetailMapper = attendanceDetailMapper;
    }

    @Override
    public AttendanceDetailDTO save(AttendanceDetailDTO attendanceDetailDTO) {
        log.debug("Request to save AttendanceDetail : {}", attendanceDetailDTO);
        AttendanceDetail attendanceDetail = attendanceDetailMapper.toEntity(attendanceDetailDTO);
        attendanceDetail = attendanceDetailRepository.save(attendanceDetail);
        return attendanceDetailMapper.toDto(attendanceDetail);
    }

    @Override
    public AttendanceDetailDTO update(AttendanceDetailDTO attendanceDetailDTO) {
        log.debug("Request to update AttendanceDetail : {}", attendanceDetailDTO);
        AttendanceDetail attendanceDetail = attendanceDetailMapper.toEntity(attendanceDetailDTO);
        attendanceDetail = attendanceDetailRepository.save(attendanceDetail);
        return attendanceDetailMapper.toDto(attendanceDetail);
    }

    @Override
    public Optional<AttendanceDetailDTO> partialUpdate(AttendanceDetailDTO attendanceDetailDTO) {
        log.debug("Request to partially update AttendanceDetail : {}", attendanceDetailDTO);

        return attendanceDetailRepository
            .findById(attendanceDetailDTO.getId())
            .map(existingAttendanceDetail -> {
                attendanceDetailMapper.partialUpdate(existingAttendanceDetail, attendanceDetailDTO);

                return existingAttendanceDetail;
            })
            .map(attendanceDetailRepository::save)
            .map(attendanceDetailMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AttendanceDetailDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AttendanceDetails");
        return attendanceDetailRepository.findAll(pageable).map(attendanceDetailMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AttendanceDetailDTO> findOne(Long id) {
        log.debug("Request to get AttendanceDetail : {}", id);
        return attendanceDetailRepository.findById(id).map(attendanceDetailMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AttendanceDetail : {}", id);
        attendanceDetailRepository.deleteById(id);
    }
}
