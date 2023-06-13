package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.model.Housing;
import becode.javagroup.travelapp.repository.HousingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/housing")
public class HousingController {

    private final HousingRepository housingRepository;

    @Autowired
    public HousingController(HousingRepository housingRepository) {
        this.housingRepository = housingRepository;
    }

    @GetMapping
    public ResponseEntity<List<Housing>> getAllHousing() {
        List<Housing> housingList = housingRepository.findAll();
        return new ResponseEntity<>(housingList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Housing> getHousingById(@PathVariable Long id) {
        Housing housing = housingRepository.findById(id).orElse(null);
        if (housing != null) {
            return new ResponseEntity<>(housing, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Housing> createHousing(@RequestBody Housing housing) {
        Housing savedHousing = housingRepository.save(housing);
        return new ResponseEntity<>(savedHousing, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Housing> updateHousing(@PathVariable Long id, @RequestBody Housing housing) {
        Housing existingHousing = housingRepository.findById(id).orElse(null);
        if (existingHousing != null) {
            housing.setId(id);
            Housing updatedHousing = housingRepository.save(housing);
            return new ResponseEntity<>(updatedHousing, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHousing(@PathVariable Long id) {
        Housing existingHousing = housingRepository.findById(id).orElse(null);
        if (existingHousing != null) {
            housingRepository.delete(existingHousing);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

