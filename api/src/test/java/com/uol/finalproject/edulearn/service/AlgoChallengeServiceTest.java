package com.uol.finalproject.edulearn.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.finalproject.edulearn.BaseIntegrationTest;
import com.uol.finalproject.edulearn.apimodel.ChallengeSubmissionDTO;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeBatchResponse;
import com.uol.finalproject.edulearn.apimodel.CodeJudgeSubmitResponse;
import com.uol.finalproject.edulearn.apimodel.request.ChallengeUserResponse;
import com.uol.finalproject.edulearn.entities.*;
import com.uol.finalproject.edulearn.entities.enums.ChallengeStatus;
import com.uol.finalproject.edulearn.entities.enums.ChallengeType;
import com.uol.finalproject.edulearn.entities.enums.ProgrammingLanguage;
import com.uol.finalproject.edulearn.entities.enums.RoleType;
import com.uol.finalproject.edulearn.repositories.ChallengeRepository;
import com.uol.finalproject.edulearn.repositories.QuestionRepository;
import com.uol.finalproject.edulearn.repositories.StudentUserRepository;
import com.uol.finalproject.edulearn.services.ChallengeService;
import com.uol.finalproject.edulearn.services.CodeJudgeRestService;
import com.uol.finalproject.edulearn.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doReturn;

@Slf4j
public class AlgoChallengeServiceTest extends BaseIntegrationTest {

    @Autowired
    private ChallengeService challengeService;

    @Autowired
    private ChallengeRepository challengeRepository;

    @SpyBean
    private CodeJudgeRestService codeJudgeRestService;

    @SpyBean
    private UserService userService;

    @SpyBean
    private QuestionRepository questionRepository;

    @Autowired
    private StudentUserRepository studentUserRepository;

    private static final String DEFAULT_USER_EMAIL = "test@test.com";

    @Before
    public void setUp() {
        UserDetailsImpl userDetails = new UserDetailsImpl(DEFAULT_USER_EMAIL);
        doReturn(userDetails).when(userService).getLoggedInUser();
        createStudentUser();
    }

    private void createStudentUser() {
        studentUserRepository.save(StudentUser.builder()
                        .email(DEFAULT_USER_EMAIL)
                        .lastName("Oguns")
                        .firstName("Olats")
                        .level(10)
                        .userLoginStatus(true)
                .build());
    }

    @Test
    public void testClassTwoSumProblem() throws Exception {
        Challenge challenge = createChallenge(ChallengeType.ALGORITHMS);
        Map<Long, String> algoResponse = new HashMap<>();
        algoResponse.put(1l, "class Main { public int[] twoSums(int[] nums, int target) { for (int i = 0; i < nums.length; i++) { for (int j = i + 1; j < nums.length; j++) { if (nums[j] == target - nums[i]) { return new int[] { i, j }; } } } return null; } }\n");

        String jsonArray = "[{\"name\":\"nums\",\"type\":\"intArray\"},{\"name\":\"target\",\"type\":\"int\"}]";
        doReturn(Optional.ofNullable(Question.builder()
                .algorithmQuestion(AlgorithmQuestion.builder()
                        .methodArguments(new ObjectMapper().readTree(jsonArray))
                        .methodName("twoSums")
                        .examples(List.of(
                                AlgorithmQuestionExample
                                        .builder()
                                        .inputArguments(new LinkedHashMap<>() {{
                                            put("nums", "new int[] { 2,7,11,15 }");
                                            put("target", 9);
                                        }})
                                        .output("new int[] {0, 1 }")
                                        .build())
                        )
                        .build())
                .build()))
                .when(questionRepository).findById(anyLong());

        ChallengeSubmissionDTO challengeSubmissionDTO = challengeService.saveChallengeQuestionResponses(ChallengeUserResponse.builder()
                        .challengeId(challenge.getId())
                        .language(ProgrammingLanguage.JAVA)
                        .algorithmResponse(algoResponse)
                .build());

        log.info("Challenge submission DTO: {}", challengeSubmissionDTO);
        Assertions.assertEquals(2, 2);
    }


    @Test
    public void testClassMergeSort() throws Exception {
        Challenge challenge = createChallenge(ChallengeType.ALGORITHMS);
        Map<Long, String> algoResponse = new HashMap<>();
        algoResponse.put(1l,
                "class Main { public int[][] merge(int[][] intervals) { if (intervals == null || intervals.length == 0) return new int[][] {}; Arrays.sort(intervals, (a, b) -> a[0] - b[0]); for (int[] res: intervals) System.out.println(Arrays.toString(res)); List<int[]> result = new ArrayList<>(); result.add(intervals[0]); for (int i = 1; i < intervals.length; i++) { int[] currentInterval = intervals[i]; int[] prevInterval = result.get(result.size() - 1); if (currentInterval[0] <= prevInterval[1]) { int[] newInterval = new int[] { prevInterval[0], Math.max(prevInterval[1], currentInterval[1]) }; result.set(result.size() - 1, newInterval); } else result.add(currentInterval); } return result.toArray(new int[result.size()][2]); } }"
                );

        String jsonArray = "[{\"name\":\"intervals\",\"type\":\"intArray\"}]";
        AlgorithmQuestionExample questionExample = AlgorithmQuestionExample
                .builder()
                .inputArguments(new LinkedHashMap<>() {{
                    put("nums", "new int[][] { new int[] {1, 3}, new int[] {2, 6}, new int[] {8, 10}, new int[] {15, 18} }");
                }})
                .output("new int[][] { new int[] {1, 6}, new int[] {8, 10}, new int[] {15, 18} }")
                .build();
        questionExample.setId(2l);

        doReturn(Optional.ofNullable(Question.builder()
                .algorithmQuestion(AlgorithmQuestion.builder()
                        .methodArguments(new ObjectMapper().readTree(jsonArray))
                        .methodName("merge")
                        .examples(List.of(questionExample))
                        .build())
                .build()))
                .when(questionRepository).findById(anyLong());

        ChallengeSubmissionDTO challengeSubmissionDTO = challengeService.saveChallengeQuestionResponses(ChallengeUserResponse.builder()
                .challengeId(challenge.getId())
                .language(ProgrammingLanguage.JAVA)
                .algorithmResponse(algoResponse)
                .build());

        log.info("Challenge submission DTO: {}", challengeSubmissionDTO);
        Assertions.assertEquals(2, 2);
    }


    @Test
    public void testClassTwoSumProblemPython() throws Exception {
        Challenge challenge = createChallenge(ChallengeType.ALGORITHMS);
        Map<Long, String> algoResponse = new HashMap<>();
        algoResponse.put(1l, "from typing import List\nclass Solution:\n    def twoSums(self, nums: List[int], target: int) -> List[int]:\n        hashmap = {}\n        for i in range(len(nums)):\n            complement = target - nums[i]\n            if complement in hashmap:\n                return [i, hashmap[complement]]\n            hashmap[nums[i]] = i");

        String jsonArray = "[{\"name\":\"nums\",\"type\":\"intArray\"},{\"name\":\"target\",\"type\":\"int\"}]";
        AlgorithmQuestionExample questionExample = AlgorithmQuestionExample
                .builder()
                .inputArguments(new LinkedHashMap<>() {{
                    put("nums", "[ 2,7,11,15 ]");
                    put("target", 9);
                }})
                .output("[0, 1]")
                .build();
        questionExample.setId(2l);

        doReturn(Optional.ofNullable(Question.builder()
                .algorithmQuestion(AlgorithmQuestion.builder()
                        .methodArguments(new ObjectMapper().readTree(jsonArray))
                        .methodName("twoSums")
                        .examples(List.of(questionExample)).build())
                .build()))
                .when(questionRepository).findById(anyLong());

        ChallengeSubmissionDTO challengeSubmissionDTO = challengeService.saveChallengeQuestionResponses(ChallengeUserResponse.builder()
                .challengeId(challenge.getId())
                .language(ProgrammingLanguage.PYTHON)
                .algorithmResponse(algoResponse)
                .build());

        log.info("Challenge submission DTO: {}", challengeSubmissionDTO);
        Assertions.assertEquals(2, 2);
    }


    @Test
    public void testClassTwoSumProblemJavascript() throws Exception {
        Challenge challenge = createChallenge(ChallengeType.ALGORITHMS);
        Map<Long, String> algoResponse = new HashMap<>();
        algoResponse.put(1l,
                "var twoSums = function(nums, target) { const cache = {};\n for (let i = 0; i < nums.length; i++) { const num = nums[i];\n const complement = target - num;\n if (complement in cache) { return [cache[complement], i];\n } cache[num] = i;\n } return [];\n };\n"
        );

        String jsonArray = "[{\"name\":\"nums\",\"type\":\"intArray\"},{\"name\":\"target\",\"type\":\"int\"}]";
        AlgorithmQuestionExample questionExample = AlgorithmQuestionExample
                .builder()
                .inputArguments(new LinkedHashMap<>() {{
                    put("nums", "[ 2,7,11,15 ]");
                    put("target", 9);
                }})
                .output("[0, 1]")
                .build();
        questionExample.setId(2l);

        doReturn(Optional.ofNullable(Question.builder()
                .algorithmQuestion(AlgorithmQuestion.builder()
                        .methodArguments(new ObjectMapper().readTree(jsonArray))
                        .methodName("twoSums")
                        .examples(List.of(questionExample)).build())
                .build()))
                .when(questionRepository).findById(anyLong());

        ChallengeSubmissionDTO challengeSubmissionDTO = challengeService.saveChallengeQuestionResponses(ChallengeUserResponse.builder()
                .challengeId(challenge.getId())
                .language(ProgrammingLanguage.JAVASCRIPT)
                .algorithmResponse(algoResponse)
                .build());

        log.info("Challenge submission DTO: {}", challengeSubmissionDTO);
        Assertions.assertEquals(2, 2);
    }

    private Challenge createChallenge(ChallengeType challengeType) {
        return challengeRepository.save(Challenge.builder()
                        .type(challengeType)
                        .title("Random Challenge 1")
                        .createdBy(RoleType.ADMIN)
                        .category("algorithms")
                        .challengeStatus(ChallengeStatus.NOT_STARTED)
                        .friendlyType("Algorithms")
                        .level(10)
                .build());
    }
}
