package org.example.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ToDoDTO {
    @NotBlank(message = "Description darf nicht leer sein")
    public String description;
    @NotNull(message = "Status darf nicht leer sein")
    public Status status;
}
