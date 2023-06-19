package becode.javagroup.travelapp.service;

import becode.javagroup.travelapp.dto.TravelPlanDto;
import becode.javagroup.travelapp.model.TravelPlan;
import becode.javagroup.travelapp.model.User;
import becode.javagroup.travelapp.repository.TravelPlanRepository;
import becode.javagroup.travelapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * This service class is responsible for managing travel plans.
 * It uses the `TravelPlanRepository` to interact with the underlying data store.
 * All operations are performed within a transactional context.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class TravelPlanService implements ITravelPlanService {

    private final TravelPlanRepository travelPlanRepository;
    private final UserRepository userRepository;

    /**
     * Fetches all the travel plans in the system.
     *
     * @return A list of `TravelPlanDto` objects.
     */
    public List<TravelPlanDto> getAllTravelPlans() {
        return travelPlanRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Fetches a travel plan by its ID.
     *
     * @param id the ID of the travel plan to be fetched.
     * @return the `TravelPlanDto` object representing the travel plan.
     * @throws IllegalArgumentException when the travel plan is not found.
     */
    public ResponseEntity<TravelPlanDto> getTravelPlan(Long id) {
        return travelPlanRepository.findById(id)
                .map(travelPlan -> ResponseEntity.ok().body(convertToDto(travelPlan)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    /**
     * Creates a new travel plan.
     *
     * @param travelPlanDto the `TravelPlanDto` object representing the travel plan to be created.
     * @return the created `TravelPlanDto` object.
     */
    public TravelPlanDto createTravelPlan(TravelPlanDto travelPlanDto) {
        TravelPlan travelPlan = convertToEntity(travelPlanDto);
        travelPlan = travelPlanRepository.save(travelPlan);
        return convertToDto(travelPlan);
    }

    /**
     * Updates an existing travel plan.
     *
     * @param id the ID of the travel plan to be updated.
     * @param travelPlanDto the `TravelPlanDto` object representing the updated travel plan.
     * @return the updated `TravelPlanDto` object.
     * @throws IllegalArgumentException when the travel plan is not found.
     */
    public TravelPlanDto updateTravelPlan(Long id, TravelPlanDto travelPlanDto) {
        TravelPlan travelPlan = travelPlanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid travel plan Id:" + id));
        BeanUtils.copyProperties(travelPlanDto, travelPlan, "id");
        travelPlan.setUser(userRepository.findById(travelPlanDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + travelPlanDto.getUserId())));
        travelPlan = travelPlanRepository.save(travelPlan);
        return convertToDto(travelPlan);
    }

    /**
     * Deletes a travel plan.
     *
     * @param id the ID of the travel plan to be deleted.
     * @throws IllegalArgumentException when the travel plan is not found.
     */
    public void deleteTravelPlan(Long id) {
        TravelPlan travelPlan = travelPlanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid travel plan Id:" + id));
        travelPlanRepository.delete(travelPlan);
    }

    /**
     * Converts a `TravelPlan` object to a `TravelPlanDto`.
     *
     * @param travelPlan the `TravelPlan` object to be converted.
     * @return the converted `TravelPlanDto`.
     */
    private TravelPlanDto convertToDto(TravelPlan travelPlan) {
        TravelPlanDto travelPlanDto = new TravelPlanDto();
        travelPlanDto.setId(travelPlan.getId());
        travelPlanDto.setDestination(travelPlan.getDestination());

        travelPlanDto.setStartDate(travelPlan.getStartDate());
        travelPlanDto.setEndDate(travelPlan.getEndDate());

        travelPlanDto.setUserId(travelPlan.getUser().getId());
        return travelPlanDto;
    }

    /**
     * Converts a `TravelPlanDto` object to a `TravelPlan`.
     *
     * @param travelPlanDto the `TravelPlanDto` object to be converted.
     * @return the converted `TravelPlan`.
     * @throws IllegalArgumentException when the user associated with the travel plan is not found.
     */
    private TravelPlan convertToEntity(TravelPlanDto travelPlanDto) {
        TravelPlan travelPlan = new TravelPlan();
        travelPlan.setId(travelPlanDto.getId());
        travelPlan.setDestination(travelPlanDto.getDestination());

        travelPlan.setStartDate(travelPlanDto.getStartDate());
        travelPlan.setEndDate(travelPlanDto.getEndDate());

        User user = userRepository.findById(travelPlanDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + travelPlanDto.getUserId()));
        travelPlan.setUser(user);
        return travelPlan;
    }
}