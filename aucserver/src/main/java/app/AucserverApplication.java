package app;

import app.entity.AuctionStatus;
import app.entity.Bid;
import app.entity.Offer;
import app.repositories.BidsRepository;
import app.repositories.OffersRepository;
import app.repositories.OffersRepositoryMock;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class AucserverApplication implements CommandLineRunner {
  @Autowired
  private OffersRepository offersRepo;

  @Autowired
  private BidsRepository bidsRepo;

  public static void main(String[] args) {
    SpringApplication.run(AucserverApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    createInitialOffers();
  }

  @Transactional
  protected void createInitialOffers() {
    List<Offer> offers = this.offersRepo.findAll();
    if (offers.size() > 0) return;
    System.out.println("Configuring Initial Offer Data");

    Offer o1 = this.offersRepo.save(new Offer("offer-1", "description offer1", AuctionStatus.FOR_SALE));
    Offer o2 = this.offersRepo.save(new Offer("offer-2", "description offer2", AuctionStatus.PAID));
    addBidsToOffer(o1);
    addBidsToOffer(o2);

    for (int i = 0; i < 4; i++) {
      Offer offer = this.offersRepo.save(Offer.createRandomOffer());
      addBidsToOffer(offer);
    }
  }

  private void addBidsToOffer(Offer offer) {
    Random r = new Random();
    for (int j = 0; j < 2; j++) {
      BigDecimal bd = BigDecimal.valueOf(20.0 * r.nextDouble()).setScale(2, RoundingMode.HALF_UP);
      Bid bid = new Bid(bd.doubleValue());
      bid.setOffer(offer);
      this.bidsRepo.save(bid);
    }
  }
}
