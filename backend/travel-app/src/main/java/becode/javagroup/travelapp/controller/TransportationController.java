package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.model.Transportation;
import becode.javagroup.travelapp.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transportation")
@CrossOrigin(origins = "http://localhost:5173")
public class TransportationController {

    private final TransportationRepository transportationRepository;

    @Autowired
    public TransportationController(TransportationRepository transportationRepository) {
        this.transportationRepository = transportationRepository;
    }

    @GetMapping
    public ResponseEntity<List<Transportation>> getAllTransportation() {
        List<Transportation> transportationList = transportationRepository.findAll();
        return new ResponseEntity<>(transportationList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transportation> getTransportationById(@PathVariable Long id) {
        Transportation transportation = transportationRepository.findById(id).orElse(null);
        if (transportation != null) {
            return new ResponseEntity<>(transportation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Transportation> createTransportation(@RequestBody Transportation transportation) {
        Transportation savedTransportation = transportationRepository.save(transportation);
        return new ResponseEntity<>(savedTransportation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transportation> updateTransportation(@PathVariable Long id, @RequestBody Transportation transportation) {
        Transportation existingTransportation = transportationRepository.findById(id).orElse(null);
        if (existingTransportation != null) {
            transportation.setId(id);
            Transportation updatedTransportation = transportationRepository.save(transportation);
            return new ResponseEntity<>(updatedTransportation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransportation(@PathVariable Long id) {
        Transportation existingTransportation = transportationRepository.findById(id).orElse(null);
        if (existingTransportation != null) {
            transportationRepository.delete(existingTransportation);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
