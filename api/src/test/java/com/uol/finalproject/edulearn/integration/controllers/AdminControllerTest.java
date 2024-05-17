package com.uol.finalproject.edulearn.integration.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.finalproject.edulearn.BaseIntegrationTest;
import com.uol.finalproject.edulearn.advice.CustomExceptionHandler;
import com.uol.finalproject.edulearn.advice.GlobalControllerAdvice;
import com.uol.finalproject.edulearn.apimodel.ChallengeDTO;
import com.uol.finalproject.edulearn.apimodel.MultipleChoiceOptionDTO;
import com.uol.finalproject.edulearn.apimodel.MultipleChoiceQuestionDTO;
import com.uol.finalproject.edulearn.apimodel.QuestionDTO;
import com.uol.finalproject.edulearn.controllers.AdminController;
import com.uol.finalproject.edulearn.entities.Challenge;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.QuestionType;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.exceptions.ResourceNotFoundException;
import com.uol.finalproject.edulearn.repositories.ChallengeRepository;
import com.uol.finalproject.edulearn.services.ChallengeService;
import com.uol.finalproject.edulearn.services.QuestionService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AdminControllerTest extends BaseIntegrationTest {


    @Autowired
    private AdminController adminController;

    @SpyBean
    private ChallengeService challengeService;

    @SpyBean
    private QuestionService questionService;

    @Autowired
    private ChallengeRepository challengeRepository;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        adminController = new AdminController(challengeService, questionService);
        mockMvc = MockMvcBuilders.standaloneSetup(adminController)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .setControllerAdvice(new CustomExceptionHandler(), new GlobalControllerAdvice())
                .build();
    }

    @Test
    public void testCreateChallengeShouldReturnSuccess() throws Exception {
        ChallengeDTO challengeRequest = ChallengeDTO.builder()
                .title("Software Architecture")
                .type(ChallengeType.MULTIPLE_CHOICE)
                .createdBy(RoleType.ADMIN)
                .challengeQuestions(List.of(QuestionDTO.builder()
                        .title("Which of these is a valid design pattern ?")
                        .category("Software Architecture")
                        .level(10)
                        .type(QuestionType.MULTIPLE_CHOICE)
                        .difficultyLevel("EASY")
                        .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                                .options(List.of(MultipleChoiceOptionDTO.builder()
                                        .title("MVC")
                                        .value("MVC")
                                        .build()))
                                .build())
                        .build()))
                .build();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/challenges")
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(challengeRequest))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.title").isNotEmpty());

        verify(challengeService, times(1)).createChallengeAndQuestions(any(ChallengeDTO.class));
    }

    @Test
    public void testCreateChallengeShouldReturnBadRequestForExistingChallengeTitle() throws Exception {
        createChallengeAndReturnDTO(ChallengeType.MULTIPLE_CHOICE);

        ChallengeDTO challengeRequest = ChallengeDTO.builder()
                .title("Software Architecture")
                .type(ChallengeType.MULTIPLE_CHOICE)
                .createdBy(RoleType.ADMIN)
                .challengeQuestions(List.of(QuestionDTO.builder()
                        .title("Which of these is a valid design pattern ?")
                        .category("Software Architecture")
                        .level(10)
                        .type(QuestionType.MULTIPLE_CHOICE)
                        .difficultyLevel("EASY")
                        .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                                .options(List.of(MultipleChoiceOptionDTO.builder()
                                        .title("MVC")
                                        .value("MVC")
                                        .build()))
                                .build())
                        .build()))
                .build();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/challenges")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(challengeRequest))
                )
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.message").value("Challenge title has been taken"));

        verify(challengeService, times(2)).createChallengeAndQuestions(any(ChallengeDTO.class));
    }


    @Test
    public void testEditChallengeShouldReturnSuccess() throws Exception {
        Challenge challenge = createChallenge(ChallengeType.MULTIPLE_CHOICE);
        challenge.setTitle("Databases");
        mockMvc.perform(MockMvcRequestBuilders.put(String.format("/api/admin/challenges/%s", challenge.getId()))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(ChallengeDTO.fromChallenge(challenge)))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.title").isNotEmpty());

        verify(challengeService, times(1)).editChallengeAndQuestions(any(ChallengeDTO.class));
    }

    @Test
    public void testEditNonExistentChallengeShouldReturnNotFound() throws Exception {
        ChallengeDTO challenge = createChallengeAndReturnDTO(ChallengeType.MULTIPLE_CHOICE);
        challenge.setId(8000l);
        mockMvc.perform(MockMvcRequestBuilders.put(String.format("/api/admin/challenges/%s", challenge.getId()))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(challenge))
                )
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Challenge with id was not found"));

        verify(challengeService, times(1)).editChallengeAndQuestions(any(ChallengeDTO.class));
    }


    @Test
    public void testCreateQuestionShouldReturnSuccess() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/questions")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(QuestionDTO.builder()
                                .title("Which of these is a valid design pattern ?")
                                .category("Software Architecture")
                                .level(10)
                                .type(QuestionType.MULTIPLE_CHOICE)
                                .difficultyLevel("EASY")
                                .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                                        .options(List.of(MultipleChoiceOptionDTO.builder()
                                                .title("MVC")
                                                .value("MVC")
                                                .build()))
                                        .build())
                                .build()))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.title").isNotEmpty());

        verify(questionService, times(1)).createQuestion(any(QuestionDTO.class));
    }


    @Test
    public void testUpdateQuestionShouldReturnSuccess() throws Exception {

        QuestionDTO question = questionService.createQuestion(QuestionDTO.builder()
                .title("Which of these is a valid design pattern ?")
                .category("Software Architecture")
                .level(10)
                .type(QuestionType.MULTIPLE_CHOICE)
                .difficultyLevel("EASY")
                .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                        .options(List.of(MultipleChoiceOptionDTO.builder()
                                .title("MVC")
                                .value("MVC")
                                .build()))
                        .build())
                .build());
        question.setTitle("Which among these options is a valid design pattern ? ");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/admin/questions")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(question))
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.title").isNotEmpty());

        verify(questionService, times(1)).createQuestion(any(QuestionDTO.class));
    }


    @Test
    public void testDeleteQuestionShouldReturnSuccess() throws Exception {

        QuestionDTO question = questionService.createQuestion(QuestionDTO.builder()
                .title("Which of these is a valid design pattern ?")
                .category("Software Architecture")
                .level(10)
                .type(QuestionType.MULTIPLE_CHOICE)
                .difficultyLevel("EASY")
                .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                        .options(List.of(MultipleChoiceOptionDTO.builder()
                                .title("MVC")
                                .value("MVC")
                                .build()))
                        .build())
                .build());

        mockMvc.perform(MockMvcRequestBuilders.delete(String.format("/api/admin/questions/%s", question.getId()))
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(new ObjectMapper().writeValueAsString(question))
                )
                .andDo(print())
                .andExpect(status().isOk());

        verify(questionService, times(1)).deleteQuestion(any(Long.class));
    }

    private Challenge createChallenge(ChallengeType challengeType) {
        ChallengeDTO challengeDTO = challengeService.createChallengeAndQuestions(ChallengeDTO.builder()
                .title("Software Architecture")
                .type(challengeType)
                .createdBy(RoleType.ADMIN)
                .challengeQuestions(List.of(QuestionDTO.builder()
                        .title("Which of these is a valid design pattern ?")
                        .category("Software Architecture")
                        .level(10)
                        .type(QuestionType.MULTIPLE_CHOICE)
                        .difficultyLevel("EASY")
                        .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                                .options(List.of(MultipleChoiceOptionDTO.builder()
                                        .title("MVC")
                                        .value("MVC")
                                        .build()))
                                .build())
                        .build()))
                .build());
        return challengeRepository.findById(challengeDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Challenge not found"));

    }

    private ChallengeDTO createChallengeAndReturnDTO(ChallengeType challengeType) {
        return challengeService.createChallengeAndQuestions(ChallengeDTO.builder()
                .title("Software Architecture")
                .type(challengeType)
                .createdBy(RoleType.ADMIN)
                .challengeQuestions(List.of(QuestionDTO.builder()
                        .title("Which of these is a valid design pattern ?")
                        .category("Software Architecture")
                        .level(10)
                        .type(QuestionType.MULTIPLE_CHOICE)
                        .difficultyLevel("EASY")
                        .multipleChoiceQuestion(MultipleChoiceQuestionDTO.builder()
                                .options(List.of(MultipleChoiceOptionDTO.builder()
                                        .title("MVC")
                                        .value("MVC")
                                        .build()))
                                .build())
                        .build()))
                .build());
    }
}
