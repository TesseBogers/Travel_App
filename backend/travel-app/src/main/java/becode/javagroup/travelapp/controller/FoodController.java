package becode.javagroup.travelapp.controller;

import becode.javagroup.travelapp.model.Food;
import becode.javagroup.travelapp.repository.FoodRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5174")
public class FoodController {
    private final FoodRepository foodRepository;

    @GetMapping
    public ResponseEntity<List<Food>> getAllFood() {
        List<Food> foodList = foodRepository.findAll();
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        Food food = foodRepository.findById(id).orElse(null);
        if (food != null) {
            return new ResponseEntity<>(food, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food savedFood = foodRepository.save(food);
        return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        Food existingFood = foodRepository.findById(id).orElse(null);
        if (existingFood != null) {
            food.setId(id);
            Food updatedFood = foodRepository.save(food);
            return new ResponseEntity<>(updatedFood, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        Food existingFood = foodRepository.findById(id).orElse(null);
        if (existingFood != null) {
            foodRepository.delete(existingFood);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

