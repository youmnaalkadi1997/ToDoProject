package org.example.backend.exception;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorMessage {
    public String message;
    public int status;
    public LocalDateTime timestamp;
}
