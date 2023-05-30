package becode.javagroup.travelapp.model;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChatMessage {

        private String senderName;
        private String receiverName;
        private String message;
        private String date;
        private Status status;

}
