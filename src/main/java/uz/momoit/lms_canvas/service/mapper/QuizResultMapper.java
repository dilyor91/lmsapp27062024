package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Quiz;
import uz.momoit.lms_canvas.domain.QuizResult;
import uz.momoit.lms_canvas.domain.QuizSession;
import uz.momoit.lms_canvas.domain.Student;
import uz.momoit.lms_canvas.service.dto.QuizDTO;
import uz.momoit.lms_canvas.service.dto.QuizResultDTO;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link QuizResult} and its DTO {@link QuizResultDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuizResultMapper extends EntityMapper<QuizResultDTO, QuizResult> {
    @Mapping(target = "quiz", source = "quiz", qualifiedByName = "quizId")
    @Mapping(target = "student", source = "student", qualifiedByName = "studentId")
    @Mapping(target = "quizSession", source = "quizSession", qualifiedByName = "quizSessionId")
    QuizResultDTO toDto(QuizResult s);

    @Named("quizId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizDTO toDtoQuizId(Quiz quiz);

    @Named("studentId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentDTO toDtoStudentId(Student student);

    @Named("quizSessionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizSessionDTO toDtoQuizSessionId(QuizSession quizSession);
}
