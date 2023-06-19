package becode.javagroup.travelapp.mapper;

import becode.javagroup.travelapp.model.UserProfile;
import becode.javagroup.travelapp.dto.UserProfileDto;
import org.mapstruct.Mapper;
import org.springframework.context.annotation.ComponentScan;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {

    UserProfile dtoToUserProfile(UserProfileDto userProfileDto);

    UserProfileDto userProfileToDto(UserProfile userProfile);
}