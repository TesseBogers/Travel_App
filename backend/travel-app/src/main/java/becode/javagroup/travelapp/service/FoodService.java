package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.model.Food;
import becode.javagroup.travelapp.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodById(Long id) {
        Optional<Food> foodOptional = foodRepository.findById(id);
        return foodOptional.orElse(null);
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public Food updateFood(Long id, Food updatedFood) {
        Optional<Food> foodOptional = foodRepository.findById(id);
        if (foodOptional.isPresent()) {
            Food food = foodOptional.get();
            food.setFoodType(updatedFood.getFoodType());
            food.setFoodName(updatedFood.getFoodName());
            food.setFoodPrice(updatedFood.getFoodPrice());
            food.setFoodAddress(updatedFood.getFoodAddress());
            food.setFoodDescription(updatedFood.getFoodDescription());
            return foodRepository.save(food);
        } else {
            return null;
        }
    }

    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }
}

