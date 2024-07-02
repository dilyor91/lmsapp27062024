package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class AssignmentCourseSectionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AssignmentCourseSection getAssignmentCourseSectionSample1() {
        return new AssignmentCourseSection().id(1L);
    }

    public static AssignmentCourseSection getAssignmentCourseSectionSample2() {
        return new AssignmentCourseSection().id(2L);
    }

    public static AssignmentCourseSection getAssignmentCourseSectionRandomSampleGenerator() {
        return new AssignmentCourseSection().id(longCount.incrementAndGet());
    }
}
