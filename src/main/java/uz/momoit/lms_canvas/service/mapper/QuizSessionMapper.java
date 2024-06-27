package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Quiz;
import uz.momoit.lms_canvas.domain.QuizSession;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.service.dto.QuizDTO;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link QuizSession} and its DTO {@link QuizSessionDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuizSessionMapper extends EntityMapper<QuizSessionDTO, QuizSession> {
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "quiz", source = "quiz", qualifiedByName = "quizId")
    QuizSessionDTO toDto(QuizSession s);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("quizId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizDTO toDtoQuizId(Quiz quiz);
}
