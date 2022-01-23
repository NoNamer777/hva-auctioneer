package app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@NamedQueries({
  @NamedQuery(name = "find_all_bids", query = "SELECT b FROM Bid b")
})
public class Bid {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private double value;

  @ManyToOne
  @JoinColumn(name="offer_id")
  @JsonIgnore
  private Offer offer;

  public Bid() {}

  public Bid(double value) {
    this.value = value;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public double getValue() {
    return value;
  }

  public void setValue(double value) {
    this.value = value;
  }

  public Offer getOffer() {
    return offer;
  }

  public void setOffer(Offer offer) {
    this.offer = offer;
  }
}
