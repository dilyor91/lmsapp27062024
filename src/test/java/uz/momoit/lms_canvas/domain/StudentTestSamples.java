package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class StudentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Student getStudentSample1() {
        return new Student()
            .id(1L)
            .firstName("firstName1")
            .lastName("lastName1")
            .middleName("middleName1")
            .gender("gender1")
            .birthdate("birthdate1")
            .phoneNumber("phoneNumber1")
            .email("email1")
            .hemisId(1L)
            .passportNumber("passportNumber1")
            .jshshir("jshshir1")
            .nationality("nationality1")
            .country("country1")
            .city("city1")
            .region("region1")
            .addressLine("addressLine1")
            .course(1)
            .semester(1);
    }

    public static Student getStudentSample2() {
        return new Student()
            .id(2L)
            .firstName("firstName2")
            .lastName("lastName2")
            .middleName("middleName2")
            .gender("gender2")
            .birthdate("birthdate2")
            .phoneNumber("phoneNumber2")
            .email("email2")
            .hemisId(2L)
            .passportNumber("passportNumber2")
            .jshshir("jshshir2")
            .nationality("nationality2")
            .country("country2")
            .city("city2")
            .region("region2")
            .addressLine("addressLine2")
            .course(2)
            .semester(2);
    }

    public static Student getStudentRandomSampleGenerator() {
        return new Student()
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .middleName(UUID.randomUUID().toString())
            .gender(UUID.randomUUID().toString())
            .birthdate(UUID.randomUUID().toString())
            .phoneNumber(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .hemisId(longCount.incrementAndGet())
            .passportNumber(UUID.randomUUID().toString())
            .jshshir(UUID.randomUUID().toString())
            .nationality(UUID.randomUUID().toString())
            .country(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .region(UUID.randomUUID().toString())
            .addressLine(UUID.randomUUID().toString())
            .course(intCount.incrementAndGet())
            .semester(intCount.incrementAndGet());
    }
}
