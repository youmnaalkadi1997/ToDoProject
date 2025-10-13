package org.example.backend.service;

import org.example.backend.model.Status;
import org.example.backend.model.ToDo;
import org.example.backend.model.ToDoDTO;
import org.example.backend.repository.ToDoRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

class ToDoServiceTest {

    @Test
    void getAllRequests() {
        List<ToDo> todoList = new ArrayList<>(List.of(
                ToDo.builder().id("1").description("Testing").status(Status.OPEN).build()
        ));

        ToDoRepository mockRepo = mock(ToDoRepository.class);
        when(mockRepo.findAll()).thenReturn(todoList);
        ToDoService toDoService = new ToDoService(mockRepo);
        List<ToDo> newList = toDoService.getAllRequests();
        assertThat(newList.get(0).getDescription()).isEqualTo("Testing");
        verify(mockRepo).findAll();
    }

    @Test
    void addToDo() {

        ToDoDTO tododto = ToDoDTO.builder().description("Testing").status(Status.OPEN).build();

        ToDoRepository mockRepo = mock(ToDoRepository.class);
        when(mockRepo.save(any(ToDo.class))).thenAnswer(invocation -> invocation.getArgument(0));
        ToDoService toDoService = new ToDoService(mockRepo);
        ToDo newTodo = toDoService.addToDo(tododto);
        assertThat(newTodo.getDescription()).isEqualTo("Testing");
        verify(mockRepo).save(any(ToDo.class));

    }

    @Test
    public void testGetToDoById_Found() {

        Optional<ToDo> todo = Optional.of(ToDo.builder().id("1").description("Testing").status(Status.OPEN).build());
        ToDoRepository mockRepo = mock(ToDoRepository.class);
        when(mockRepo.findById("1")).thenReturn(todo);
        ToDoService toDoService = new ToDoService(mockRepo);
        Optional<ToDo> newtoDo = toDoService.getToDoById("1");
        assertThat(newtoDo.get().getId()).isEqualTo("1");
        verify(mockRepo).findById("1");
    }

    @Test
    public void testGetToDoById_NotFound() {
        ToDoRepository mockRepo = mock(ToDoRepository.class);
        when(mockRepo.findById("1")).thenReturn(Optional.empty());
        ToDoService toDoService = new ToDoService(mockRepo);
        Optional<ToDo> newtoDo = toDoService.getToDoById("1");
        assertThat(newtoDo).isEmpty();
        verify(mockRepo).findById("1");
    }

    @Test
    void updateToDo() {
        ToDo todo = ToDo.builder().id("1").description("Testing").status(Status.OPEN).build();
        ToDoDTO toDoDTO = ToDoDTO.builder().description("Testing").status(Status.IN_PROGRESS).build();
        ToDoRepository mockRepo = mock(ToDoRepository.class);
        when(mockRepo.findById("1")).thenReturn(Optional.of(todo));
        when(mockRepo.save(any(ToDo.class))).thenAnswer(invocation -> invocation.getArgument(0));
        ToDoService toDoService = new ToDoService(mockRepo);
        ToDo newTodo = toDoService.updateToDo("1", toDoDTO);
        assertThat(newTodo.getStatus()).isEqualTo(Status.IN_PROGRESS);
        verify(mockRepo).findById("1");
        verify(mockRepo).save(newTodo);
    }

    @Test
    void deleteToDoById() {
        String id = "1";
        ToDoRepository mockRepo = mock(ToDoRepository.class);

        doNothing().when(mockRepo).deleteById(id);
        when(mockRepo.existsById(id)).thenReturn(true);
        ToDoService toDoService = new ToDoService(mockRepo);
        toDoService.deleteToDoById(id);
        verify(mockRepo).deleteById(id);
    }

}