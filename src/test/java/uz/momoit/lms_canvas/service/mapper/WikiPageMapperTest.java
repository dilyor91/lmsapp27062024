package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.WikiPageAsserts.*;
import static uz.momoit.lms_canvas.domain.WikiPageTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WikiPageMapperTest {

    private WikiPageMapper wikiPageMapper;

    @BeforeEach
    void setUp() {
        wikiPageMapper = new WikiPageMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getWikiPageSample1();
        var actual = wikiPageMapper.toEntity(wikiPageMapper.toDto(expected));
        assertWikiPageAllPropertiesEquals(expected, actual);
    }
}
