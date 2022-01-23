package app.rest;

import app.entity.Bid;
import app.repositories.BidsRepository;
import app.repositories.OffersRepository;
import app.rest.exceptions.ForbiddenException;
import app.rest.exceptions.ResourceNotFoundException;
import app.entity.Offer;
import app.entity.OfferView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class OffersController {
  @Autowired
  private OffersRepository offersRepository;

  @Autowired
  private BidsRepository bidsRepository;

  public OffersController(OffersRepository offersRepository, BidsRepository bidsRepository) {
    this.offersRepository = offersRepository;
    this.bidsRepository = bidsRepository;
  }

  @GetMapping("/offers")
  public MappingJacksonValue getAllOffers() {
    MappingJacksonValue values = new MappingJacksonValue(offersRepository.findAll());
    //values.setSerializationView(OfferView.ShowIdTitleAndStatus.class);
    return values;
  }

  @GetMapping("/offers/{id}")
  public ResponseEntity getOfferFromId(@PathVariable long id) {
    Offer offer = offersRepository.findById(id);
    if (offer == null) throw new ResourceNotFoundException("Offer with id=" + id + " does not exists");
    return new ResponseEntity<>(offer, HttpStatus.OK);
  }

  @PostMapping("/offers")
  public ResponseEntity saveOffer(@RequestBody Offer offer) {
    Offer newOffer = offersRepository.save(offer);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(newOffer.getId())
      .toUri();
    return ResponseEntity.created(location).body(newOffer);
  }

  @PostMapping("/offers/{id}")
  public ResponseEntity saveOfferById(@PathVariable long id, @RequestBody Offer offer) {
    if (id != offer.getId())
      throw new ForbiddenException("Offer-Id=" + offer.getId() + " does not match path parameter=" + id);
    return new ResponseEntity<>(offersRepository.save(offer), HttpStatus.CREATED);
  }

  @DeleteMapping("/offers/{id}")
  public ResponseEntity deleteOffer(@PathVariable long id) {
    boolean deleted = offersRepository.deleteById(id);
    if (!deleted) throw new ResourceNotFoundException("Offer with id=" + id + " does not exists");
    return new ResponseEntity<>(deleted, HttpStatus.OK);
  }

  @PostMapping("/offers/{id}/bids")
  public ResponseEntity saveBid(@PathVariable long id, @RequestBody Bid newBid) {
    Offer offer = offersRepository.findById(id);
    if (!offer.getAuctionStatus().toString().equals("FOR_SALE") || offer.getValueHighestBid() > newBid.getValue())
      throw new ForbiddenException("Bid with value=" + newBid.getValue() + " does not beat latest bid on offerId=" + id);
    newBid.setOffer(offer);
    Bid bid = bidsRepository.save(newBid);
    return new ResponseEntity<>(bid, HttpStatus.OK);
  }
}
