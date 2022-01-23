package app.repositories;

import app.entity.Bid;
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
public class BidsRepositoryJPA implements BidsRepository {
  @Autowired
  private EntityManager em;

  @Transactional
  @Override
  public List<Bid> findAll() {
    TypedQuery<Bid> typedQuery = em.createNamedQuery("find_all_bids", Bid.class);
    return typedQuery.getResultList();
  }

  @Transactional
  @Override
  public Bid findById(long id) {
    return em.find(Bid.class, id);
  }

  @Transactional
  @Override
  public Bid save(Bid bid) {
    em.persist(bid);
    return findById(bid.getId());
  }

  @Transactional
  @Override
  public boolean deleteById(long id) {
    Bid bid = findById(id);
    em.remove(bid);
    return true;
  }
}
