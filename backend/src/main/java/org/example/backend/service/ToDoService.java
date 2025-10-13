package org.example.backend.service;

import org.example.backend.model.ToDo;
import org.example.backend.model.ToDoDTO;
import org.example.backend.repository.ToDoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository ) {
        this.toDoRepository = toDoRepository;
    }




    public List<ToDo> getAllRequests() {
        return toDoRepository.findAll();
    }

    public ToDo addToDo(ToDoDTO toDoDto) {
        String id = UUID.randomUUID().toString();
        ToDo toDo = ToDo.builder().id(id).description(toDoDto.getDescription()).status(toDoDto.getStatus()).build();
        return toDoRepository.save(toDo);
    }

    public Optional<ToDo> getToDoById(String id) {
        return toDoRepository.findById(id);
    }

    public ToDo updateToDo(String id, ToDoDTO toDoDTO) {
        Optional<ToDo> existingToDoOpt = toDoRepository.findById(id);
        if (existingToDoOpt.isPresent()) {
            ToDo existingToDo = existingToDoOpt.get();
            existingToDo.setDescription(toDoDTO.getDescription());
            existingToDo.setStatus(toDoDTO.getStatus());

            return toDoRepository.save(existingToDo);
        } else {
            return null;
        }
    }

    public void deleteToDoById(String id) {
        if (toDoRepository.existsById(id)) {
            toDoRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("No ToDo found with Id:" + id);
        }
    }
}

