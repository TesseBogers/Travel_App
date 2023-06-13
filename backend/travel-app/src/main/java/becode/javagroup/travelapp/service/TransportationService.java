package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.model.Transportation;
import becode.javagroup.travelapp.repository.TransportationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportationService {
    private final TransportationRepository transportationRepository;

    @Autowired
    public TransportationService(TransportationRepository transportationRepository) {
        this.transportationRepository = transportationRepository;
    }

    public List<Transportation> getAllTransportations() {
        return transportationRepository.findAll();
    }

    public Transportation getTransportationById(Long id) {
        Optional<Transportation> transportationOptional = transportationRepository.findById(id);
        return transportationOptional.orElse(null);
    }

    public Transportation createTransportation(Transportation transportation) {
        return transportationRepository.save(transportation);
    }

    public Transportation updateTransportation(Long id, Transportation updatedTransportation) {
        Optional<Transportation> transportationOptional = transportationRepository.findById(id);
        if (transportationOptional.isPresent()) {
            Transportation transportation = transportationOptional.get();
            transportation.setTransportationType(updatedTransportation.getTransportationType());
            transportation.setTransportationName(updatedTransportation.getTransportationName());
            transportation.setTransportationPrice(updatedTransportation.getTransportationPrice());
            transportation.setTransportationDeparture(updatedTransportation.getTransportationDeparture());
            transportation.setTransportationArrival(updatedTransportation.getTransportationArrival());
            transportation.setTransportationArrivalTime(updatedTransportation.getTransportationArrivalTime());
            transportation.setTransportationDepartureTime(updatedTransportation.getTransportationDepartureTime());
            transportation.setTransportationDescription(updatedTransportation.getTransportationDescription());
            return transportationRepository.save(transportation);
        } else {
            return null;
        }
    }

    public void deleteTransportation(Long id) {
        transportationRepository.deleteById(id);
    }
}
