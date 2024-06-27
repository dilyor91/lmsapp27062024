package uz.momoit.lms_canvas.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.domain.Accounts;
import uz.momoit.lms_canvas.repository.AccountsRepository;
import uz.momoit.lms_canvas.service.AccountsService;
import uz.momoit.lms_canvas.service.dto.AccountsDTO;
import uz.momoit.lms_canvas.service.mapper.AccountsMapper;

/**
 * Service Implementation for managing {@link uz.momoit.lms_canvas.domain.Accounts}.
 */
@Service
@Transactional
public class AccountsServiceImpl implements AccountsService {

    private static final Logger log = LoggerFactory.getLogger(AccountsServiceImpl.class);

    private final AccountsRepository accountsRepository;

    private final AccountsMapper accountsMapper;

    public AccountsServiceImpl(AccountsRepository accountsRepository, AccountsMapper accountsMapper) {
        this.accountsRepository = accountsRepository;
        this.accountsMapper = accountsMapper;
    }

    @Override
    public AccountsDTO save(AccountsDTO accountsDTO) {
        log.debug("Request to save Accounts : {}", accountsDTO);
        Accounts accounts = accountsMapper.toEntity(accountsDTO);
        accounts = accountsRepository.save(accounts);
        return accountsMapper.toDto(accounts);
    }

    @Override
    public AccountsDTO update(AccountsDTO accountsDTO) {
        log.debug("Request to update Accounts : {}", accountsDTO);
        Accounts accounts = accountsMapper.toEntity(accountsDTO);
        accounts = accountsRepository.save(accounts);
        return accountsMapper.toDto(accounts);
    }

    @Override
    public Optional<AccountsDTO> partialUpdate(AccountsDTO accountsDTO) {
        log.debug("Request to partially update Accounts : {}", accountsDTO);

        return accountsRepository
            .findById(accountsDTO.getId())
            .map(existingAccounts -> {
                accountsMapper.partialUpdate(existingAccounts, accountsDTO);

                return existingAccounts;
            })
            .map(accountsRepository::save)
            .map(accountsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AccountsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Accounts");
        return accountsRepository.findAll(pageable).map(accountsMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AccountsDTO> findOne(Long id) {
        log.debug("Request to get Accounts : {}", id);
        return accountsRepository.findById(id).map(accountsMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Accounts : {}", id);
        accountsRepository.deleteById(id);
    }
}
