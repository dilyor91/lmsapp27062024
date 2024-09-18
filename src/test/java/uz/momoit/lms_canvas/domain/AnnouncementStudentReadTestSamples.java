package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class AnnouncementStudentReadTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AnnouncementStudentRead getAnnouncementStudentReadSample1() {
        return new AnnouncementStudentRead().id(1L);
    }

    public static AnnouncementStudentRead getAnnouncementStudentReadSample2() {
        return new AnnouncementStudentRead().id(2L);
    }

    public static AnnouncementStudentRead getAnnouncementStudentReadRandomSampleGenerator() {
        return new AnnouncementStudentRead().id(longCount.incrementAndGet());
    }
}
