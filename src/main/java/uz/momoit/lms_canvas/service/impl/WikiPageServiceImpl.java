package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.WikiPage;
import uz.momoit.lms_canvas.repository.WikiPageRepository;
import uz.momoit.lms_canvas.service.WikiPageService;
import uz.momoit.lms_canvas.service.dto.WikiPageDTO;
import uz.momoit.lms_canvas.service.mapper.WikiPageMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.WikiPage}.
 */
@Service
@Transactional
public class WikiPageServiceImpl implements WikiPageService {

    private static final Logger log = LoggerFactory.getLogger(WikiPageServiceImpl.class);

    private final WikiPageRepository wikiPageRepository;

    private final WikiPageMapper wikiPageMapper;

    public WikiPageServiceImpl(WikiPageRepository wikiPageRepository, WikiPageMapper wikiPageMapper) {
        this.wikiPageRepository = wikiPageRepository;
        this.wikiPageMapper = wikiPageMapper;
    }

    @Override
    public WikiPageDTO save(WikiPageDTO wikiPageDTO) {
        log.debug("Request to save WikiPage : {}", wikiPageDTO);
        WikiPage wikiPage = wikiPageMapper.toEntity(wikiPageDTO);
        wikiPage = wikiPageRepository.save(wikiPage);
        return wikiPageMapper.toDto(wikiPage);
    }

    @Override
    public WikiPageDTO update(WikiPageDTO wikiPageDTO) {
        log.debug("Request to update WikiPage : {}", wikiPageDTO);
        WikiPage wikiPage = wikiPageMapper.toEntity(wikiPageDTO);
        wikiPage = wikiPageRepository.save(wikiPage);
        return wikiPageMapper.toDto(wikiPage);
    }

    @Override
    public Optional<WikiPageDTO> partialUpdate(WikiPageDTO wikiPageDTO) {
        log.debug("Request to partially update WikiPage : {}", wikiPageDTO);

        return wikiPageRepository
            .findById(wikiPageDTO.getId())
            .map(existingWikiPage -> {
                wikiPageMapper.partialUpdate(existingWikiPage, wikiPageDTO);

                return existingWikiPage;
            })
            .map(wikiPageRepository::save)
            .map(wikiPageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WikiPageDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WikiPages");
        return wikiPageRepository.findAll(pageable).map(wikiPageMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WikiPageDTO> findOne(Long id) {
        log.debug("Request to get WikiPage : {}", id);
        return wikiPageRepository.findById(id).map(wikiPageMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete WikiPage : {}", id);
        wikiPageRepository.deleteById(id);
    }
}
