package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class AnnouncementCourseSectionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AnnouncementCourseSection getAnnouncementCourseSectionSample1() {
        return new AnnouncementCourseSection().id(1L);
    }

    public static AnnouncementCourseSection getAnnouncementCourseSectionSample2() {
        return new AnnouncementCourseSection().id(2L);
    }

    public static AnnouncementCourseSection getAnnouncementCourseSectionRandomSampleGenerator() {
        return new AnnouncementCourseSection().id(longCount.incrementAndGet());
    }
}
