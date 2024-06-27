package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class OptionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Option getOptionSample1() {
        return new Option().id(1L).optionText("optionText1");
    }

    public static Option getOptionSample2() {
        return new Option().id(2L).optionText("optionText2");
    }

    public static Option getOptionRandomSampleGenerator() {
        return new Option().id(longCount.incrementAndGet()).optionText(UUID.randomUUID().toString());
    }
}
