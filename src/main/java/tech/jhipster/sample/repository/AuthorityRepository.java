package tech.jhipster.sample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.jhipster.sample.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
