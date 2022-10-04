package demo3.repository;

import demo3.domain.DS;
import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DS entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DSRepository extends JpaRepository<DS, Long> {
    Optional<DS> findOneById(Long id);

    void deleteDSByIdIn(Collection<Long> id);
}
