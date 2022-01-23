package app.repositories;

import app.entity.Offer;

import java.util.List;

public interface OffersRepository {
  public List<Offer> findAll();
  public Offer findById(long id);
  public Offer save(Offer offer);
  public boolean deleteById(long id);
}
