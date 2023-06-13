package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.model.Visits;
import becode.javagroup.travelapp.repository.VisitsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visits")
public class VisitsController {

    private final VisitsRepository visitsRepository;

    @Autowired
    public VisitsController(VisitsRepository visitsRepository) {
        this.visitsRepository = visitsRepository;
    }

    @GetMapping
    public ResponseEntity<List<Visits>> getAllVisits() {
        List<Visits> visitsList = visitsRepository.findAll();
        return new ResponseEntity<>(visitsList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visits> getVisitsById(@PathVariable Long id) {
        Visits visits = visitsRepository.findById(id).orElse(null);
        if (visits != null) {
            return new ResponseEntity<>(visits, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Visits> createVisits(@RequestBody Visits visits) {
        Visits savedVisits = visitsRepository.save(visits);
        return new ResponseEntity<>(savedVisits, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Visits> updateVisits(@PathVariable Long id, @RequestBody Visits visits) {
        Visits existingVisits = visitsRepository.findById(id).orElse(null);
        if (existingVisits != null) {
            visits.setId(id);
            Visits updatedVisits = visitsRepository.save(visits);
            return new ResponseEntity<>(updatedVisits, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisits(@PathVariable Long id) {
        Visits existingVisits = visitsRepository.findById(id).orElse(null);
        if (existingVisits != null) {
            visitsRepository.delete(existingVisits);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
