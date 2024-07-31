package uz.momoit.lms_canvas.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                Object.class,
                Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries())
            )
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build()
        );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, uz.momoit.lms_canvas.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, uz.momoit.lms_canvas.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, uz.momoit.lms_canvas.domain.User.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Authority.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.User.class.getName() + ".authorities");
            createCache(cm, uz.momoit.lms_canvas.domain.Course.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.CourseSection.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.CourseSection.class.getName() + ".announcements");
            createCache(cm, uz.momoit.lms_canvas.domain.CourseSection.class.getName() + ".assignments");
            createCache(cm, uz.momoit.lms_canvas.domain.Accounts.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Enrollment.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Announcement.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Announcement.class.getName() + ".courseSections");
            createCache(cm, uz.momoit.lms_canvas.domain.Assignment.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Assignment.class.getName() + ".courseSections");
            createCache(cm, uz.momoit.lms_canvas.domain.CalendarEvent.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.WikiPage.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Attendance.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.AttendanceDetail.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Student.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Teacher.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.StudyAcademicYear.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Faculty.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Speciality.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Group.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Department.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.QuestionGroup.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Question.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Option.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Quiz.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.QuizQuestionGroup.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.QuizCourseSection.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.QuizSession.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.StudentOption.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.StudentQuestion.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.StudentAnswerQuestion.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.QuizResult.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Lesson.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.StudyTerm.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.AssignmentCourseSection.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.CourseWeekInfo.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.CourseWeek.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.LessonMaterial.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Attachment.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.SubmissionAssignment.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Grade.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.AssignmentComment.class.getName());
            createCache(cm, uz.momoit.lms_canvas.domain.Notification.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
