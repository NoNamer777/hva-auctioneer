package app.repositories;

import app.entity.Offer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Primary
@Repository
public class OffersRepositoryJPA implements OffersRepository {
  @Autowired
  private EntityManager em;

  @Transactional
  @Override
  public List<Offer> findAll() {
    TypedQuery<Offer> typedQuery = em.createNamedQuery("find_all", Offer.class);
    return typedQuery.getResultList();
  }

  @Transactional
  @Override
  public Offer findById(long id) {
    return em.find(Offer.class, id);
  }

  @Transactional
  @Override
  public Offer save(Offer offer) {
    em.persist(offer);
    return findById(offer.getId());
  }

  @Transactional
  @Override
  public boolean deleteById(long id) {
    Offer offer = findById(id);
    em.remove(offer);
    return true;
  }
}
