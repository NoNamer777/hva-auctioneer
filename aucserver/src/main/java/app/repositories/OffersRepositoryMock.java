package app.repositories;

import app.entity.AuctionStatus;
import app.entity.Offer;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.IntStream;

@Component
public class OffersRepositoryMock implements OffersRepository {
  private ArrayList<Offer> offers = new ArrayList<>();

  public OffersRepositoryMock() {
    for (int i = 0; i < 7; i++) {
      addRandomOffer("Offer-" + (i+1));
    }
  }

  public void add(Offer offer) {
    offers.add(offer);
  }

  public void addRandomOffer(String title) {
    AuctionStatus[] statuses = AuctionStatus.values();

    add(new Offer(
      offers.size()+1,
      title,
      new Date(),
      "Description of " + title,
      statuses[new Random().nextInt(statuses.length)],
      getRandomInt(1, 20),
      getRandomInt(0, 1000)
    ));
  }

  public int getRandomInt(int min, int max) {
    return new Random().nextInt(max - min) + min;
  }

  @Override
  public List<Offer> findAll() {
    return offers;
  }

  @Override
  public Offer findById(long id) {
    return offers.stream().filter(o->o.getId() == id).findFirst().orElse(null);
  }

  @Override
  public Offer save(Offer offer) {
    if (offer.getId() == 0) {
      offer.setId(offers.size());
      offers.add(offer);
    } else {
      int index = IntStream.range(0, offers.size()).filter(i->offers.get(i).getId() == offer.getId()).findFirst().orElse(-1);
      offers.set(index, offer);
    }

    return offer;
  }

  @Override
  public boolean deleteById(long id) {
    int index = IntStream.range(0, offers.size()).filter(i->offers.get(i).getId() == id).findFirst().orElse(-1);
    if(index != -1) {
      offers.remove(index);
      return true;
    } else {
      return false;
    }
  }
}
