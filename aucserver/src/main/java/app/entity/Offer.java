package app.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Entity
@NamedQueries({
  @NamedQuery(name = "find_all", query = "SELECT o FROM Offer o")
})
public class Offer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonView(OfferView.ShowIdTitleAndStatus.class)
  private long id;
  @JsonView(OfferView.ShowIdTitleAndStatus.class)
  private String title;
  private Date sellDate;
  private String description;
  @JsonView(OfferView.ShowIdTitleAndStatus.class)
  private AuctionStatus auctionStatus;
  private int numberOfBids;
  private int valueHighestBid;

  @OneToMany(targetEntity = Bid.class, mappedBy = "offer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private List<Bid> bids = new ArrayList<>();


  public Offer() {
  }

  public Offer(long id, String title, Date sellDate, String description, AuctionStatus auctionStatus, int numberOfBids, int valueHighestBid) {
    this(title, sellDate, description, auctionStatus, numberOfBids, valueHighestBid);
    this.id = id;
  }

  public Offer(String title, String description, AuctionStatus auctionStatus) {
    this.title = title;
    this.description = description;
    this.auctionStatus = auctionStatus;
  }

  public Offer(String title, Date sellDate, String description, AuctionStatus auctionStatus, int numberOfBids, int valueHighestBid) {
    this.title = title;
    this.sellDate = sellDate;
    this.description = description;
    this.auctionStatus = auctionStatus;
    this.numberOfBids = numberOfBids;
    this.valueHighestBid = valueHighestBid;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public Date getSellDate() {
    return sellDate;
  }

  public String getDescription() {
    return description;
  }

  public AuctionStatus getAuctionStatus() {
    return auctionStatus;
  }

  public List<Bid> getBids() {
    return bids;
  }

  public void setBids(List<Bid> bids) {
    this.bids.clear();

    for (Bid bid : bids) {
      bid.setOffer(this);
      this.bids.add(bid);
    }
  }

  public static Offer createRandomOffer() {
    AuctionStatus[] statuses = AuctionStatus.values();

    return new Offer("new offer", "Description of new offer", statuses[new Random().nextInt(statuses.length)]);
  }

  public Bid getLatestBid() {
    return bids.get(bids.size() - 1);
  }

  public boolean addHigherBid(Bid newBid) {
    if (getLatestBid().getValue() > newBid.getValue()) {
      bids.add(newBid);
      return true;
    }

    return false;
  }

  public double getValueHighestBid() {
    return bids.size() > 0 ? getLatestBid().getValue() : 0.0;
  }

  public int getNumberOfBids() {
    return bids.size();
  }
}

