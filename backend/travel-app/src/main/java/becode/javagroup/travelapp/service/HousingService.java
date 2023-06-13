package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.model.Housing;
import becode.javagroup.travelapp.repository.HousingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HousingService {
    private final HousingRepository housingRepository;

    @Autowired
    public HousingService(HousingRepository housingRepository) {
        this.housingRepository = housingRepository;
    }

    public List<Housing> getAllHousing() {
        return housingRepository.findAll();
    }

    public Housing getHousingById(Long id) {
        Optional<Housing> housingOptional = housingRepository.findById(id);
        return housingOptional.orElse(null);
    }

    public Housing createHousing(Housing housing) {
        return housingRepository.save(housing);
    }

    public Housing updateHousing(Long id, Housing updatedHousing) {
        Optional<Housing> housingOptional = housingRepository.findById(id);
        if (housingOptional.isPresent()) {
            Housing housing = housingOptional.get();
            housing.setHousingType(updatedHousing.getHousingType());
            housing.setHousingName(updatedHousing.getHousingName());
            housing.setHousingPrice(updatedHousing.getHousingPrice());
            housing.setHousingAddress(updatedHousing.getHousingAddress());
            housing.setHousingArrival(updatedHousing.getHousingArrival());
            housing.setHousingDescription(updatedHousing.getHousingDescription());
            return housingRepository.save(housing);
        } else {
            return null;
        }
    }

    public void deleteHousing(Long id) {
        housingRepository.deleteById(id);
    }
}

