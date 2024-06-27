package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Accounts;
import uz.momoit.lms_canvas.service.dto.AccountsDTO;

/**
 * Mapper for the entity {@link Accounts} and its DTO {@link AccountsDTO}.
 */
@Mapper(componentModel = "spring")
public interface AccountsMapper extends EntityMapper<AccountsDTO, Accounts> {}
