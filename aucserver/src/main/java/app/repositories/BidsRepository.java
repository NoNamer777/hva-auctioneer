package app.repositories;

import app.entity.Bid;
import app.entity.Offer;

import java.util.List;

public interface BidsRepository {
  public List<Bid> findAll();
  public Bid findById(long id);
  public Bid save(Bid bid);
  public boolean deleteById(long id);
}
