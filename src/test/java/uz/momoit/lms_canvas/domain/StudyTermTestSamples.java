package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class StudyTermTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static StudyTerm getStudyTermSample1() {
        return new StudyTerm().id(1L).termName("termName1");
    }

    public static StudyTerm getStudyTermSample2() {
        return new StudyTerm().id(2L).termName("termName2");
    }

    public static StudyTerm getStudyTermRandomSampleGenerator() {
        return new StudyTerm().id(longCount.incrementAndGet()).termName(UUID.randomUUID().toString());
    }
}
