package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class WikiPageTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static WikiPage getWikiPageSample1() {
        return new WikiPage().id(1L).title("title1").content("content1");
    }

    public static WikiPage getWikiPageSample2() {
        return new WikiPage().id(2L).title("title2").content("content2");
    }

    public static WikiPage getWikiPageRandomSampleGenerator() {
        return new WikiPage().id(longCount.incrementAndGet()).title(UUID.randomUUID().toString()).content(UUID.randomUUID().toString());
    }
}
