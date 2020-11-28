package tech.jhipster.sample.repository;

import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.jhipster.sample.domain.PersistentAuditEvent;

/**
 * Spring Data JPA repository for the {@link PersistentAuditEvent} entity.
 */
public interface PersistenceAuditEventRepository
	extends JpaRepository<PersistentAuditEvent, Long> {
	List<PersistentAuditEvent> findByPrincipal(String principal);

	List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfterAndAuditEventType(
		String principal,
		Instant after,
		String type
	);

	Page<PersistentAuditEvent> findAllByAuditEventDateBetween(
		Instant fromDate,
		Instant toDate,
		Pageable pageable
	);

	List<PersistentAuditEvent> findByAuditEventDateBefore(Instant before);
}
