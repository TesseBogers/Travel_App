package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.model.Visits;
import becode.javagroup.travelapp.repository.VisitsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisitsService {
    private final VisitsRepository visitsRepository;

    @Autowired
    public VisitsService(VisitsRepository visitsRepository) {
        this.visitsRepository = visitsRepository;
    }

    public List<Visits> getAllVisits() {
        return visitsRepository.findAll();
    }

    public Visits getVisitsById(Long id) {
        Optional<Visits> visitsOptional = visitsRepository.findById(id);
        return visitsOptional.orElse(null);
    }

    public Visits createVisits(Visits visits) {
        return visitsRepository.save(visits);
    }

    public Visits updateVisits(Long id, Visits updatedVisits) {
        Optional<Visits> visitsOptional = visitsRepository.findById(id);
        if (visitsOptional.isPresent()) {
            Visits visits = visitsOptional.get();
            visits.setVisitType(updatedVisits.getVisitType());
            visits.setVisitName(updatedVisits.getVisitName());
            visits.setVisitPrice(updatedVisits.getVisitPrice());
            visits.setVisitAddress(updatedVisits.getVisitAddress());
            visits.setVisitArrival(updatedVisits.getVisitArrival());
            visits.setVisitDescription(updatedVisits.getVisitDescription());
            return visitsRepository.save(visits);
        } else {
            return null;
        }
    }

    public void deleteVisits(Long id) {
        visitsRepository.deleteById(id);
    }
}

