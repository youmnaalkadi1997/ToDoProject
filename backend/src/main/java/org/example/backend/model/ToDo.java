package org.example.backend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ToDo {

    public String id;
    public String description;
    public Status status;
}
