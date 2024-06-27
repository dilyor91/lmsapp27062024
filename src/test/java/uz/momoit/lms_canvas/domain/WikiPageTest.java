package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.WikiPageTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class WikiPageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WikiPage.class);
        WikiPage wikiPage1 = getWikiPageSample1();
        WikiPage wikiPage2 = new WikiPage();
        assertThat(wikiPage1).isNotEqualTo(wikiPage2);

        wikiPage2.setId(wikiPage1.getId());
        assertThat(wikiPage1).isEqualTo(wikiPage2);

        wikiPage2 = getWikiPageSample2();
        assertThat(wikiPage1).isNotEqualTo(wikiPage2);
    }

    @Test
    void courseTest() {
        WikiPage wikiPage = getWikiPageRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        wikiPage.setCourse(courseBack);
        assertThat(wikiPage.getCourse()).isEqualTo(courseBack);

        wikiPage.course(null);
        assertThat(wikiPage.getCourse()).isNull();
    }
}
