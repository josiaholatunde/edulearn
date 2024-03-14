
use edulearn;

-- START TRANSACTION;

INSERT INTO challenges (title, category, friendly_type, type, level, created_by, start_date, end_date, submissions, created_at, updated_at, participant_type, total_participants)
VALUES
    ('Databases', 'databases', 'Multiple Choice', 'MULTIPLE_CHOICE', 10, 'ADMIN', '2024-02-22', '2024-03-22', 102, current_timestamp(), current_timestamp(), 'GROUP', 1),
    ('Mock Test', 'system_design', 'Algorithms', 'ALGORITHMS', 9, 'ADMIN', '2024-02-22', '2024-03-22', 1020, current_timestamp(), current_timestamp(), 'GROUP', 1),
    ('Dynamic Programming', 'dynamic_programming', 'Algorithms', 'ALGORITHMS', 10, 'ADMIN', '2024-02-22', '2024-03-22', 20, current_timestamp(), current_timestamp(), 'GROUP', 1),
    ('Graph Theory', 'graph_theory', 'Multiple Choice', 'MULTIPLE_CHOICE', 9, 'ADMIN', '2024-02-22', '2024-03-22', 200, current_timestamp(), current_timestamp(), 'GROUP', 1);


INSERT INTO questions(title, category, level, created_at, updated_at)
VALUES
    ('Which of these is a valid DDL (Data definition language) statement ?', 'databases', 10, current_timestamp(), current_timestamp()),
    ('Which of the following is not a type of database model?', 'databases', 10, current_timestamp(), current_timestamp()),
    ('What does SQL stand for ?', 'databases', 10, current_timestamp(), current_timestamp()),
    ('What does ACID stand for in database transactions?', 'databases', 10, current_timestamp(), current_timestamp());


INSERT INTO questions(title, category, level, created_at, updated_at)
VALUES ('Longest Common Subsequence','dynamic_programming',10, current_timestamp(), current_timestamp());

-- Insert multiple choice questions for Challenge 1: Databases
INSERT INTO multiple_choice_questions (question_id, has_multiple_answers, created_at, updated_at)
VALUES
    (1, false, current_timestamp(), current_timestamp()),
    (2, false, current_timestamp(), current_timestamp()),
    (3, false, current_timestamp(), current_timestamp()),
    (4, false, current_timestamp(), current_timestamp());

-- Insert options for question 1
INSERT INTO multiple_choice_question_options (title, value, multiple_choice_question_id, created_at, updated_at)
VALUES
    ('SELECT', 'SELECT', 1, current_timestamp(), current_timestamp()),
    ('UPDATE', 'UPDATE', 1, current_timestamp(), current_timestamp()),
    ('ALTER', 'ALTER', 1, current_timestamp(), current_timestamp()),
    ('DELETE', 'DELETE', 1, current_timestamp(), current_timestamp());

-- Insert options for question 2
INSERT INTO multiple_choice_question_options (multiple_choice_question_id, title, value, created_at, updated_at)
VALUES
    (2, 'Relational', 'Relational', current_timestamp(), current_timestamp()),
    (2, 'Hierarchical', 'Hierarchical', current_timestamp(), current_timestamp()),
    (2, 'Network', 'Network', current_timestamp(), current_timestamp()),
    (2, 'Linear', 'Linear', current_timestamp(), current_timestamp());

-- Insert options for question 3
INSERT INTO multiple_choice_question_options (multiple_choice_question_id, title, value, created_at, updated_at)
VALUES
    (3, 'Structured Query Language', 'Structured Query Language', current_timestamp(), current_timestamp()),
    (3, 'Hierarchical', 'Hierarchical', current_timestamp(), current_timestamp()),
    (3, 'Sequential Query Language', 'Sequential Query Language', current_timestamp(), current_timestamp()),
    (3, ' Standard Query Language', ' Standard Query Language', current_timestamp(), current_timestamp());

-- Insert options for question 4
INSERT INTO multiple_choice_question_options (multiple_choice_question_id, title, value, created_at, updated_at)
VALUES
    (4, 'Atomicity, Consistency, Isolation, Durability', 'Atomicity, Consistency, Isolation, Durability', current_timestamp(), current_timestamp()),
    (4, 'All Columns Identified Directly', 'Hierarchical', current_timestamp(), current_timestamp()),
    (4, 'Automated Control of Information and Data', 'Sequential Query Language', current_timestamp(), current_timestamp()),
    (4, 'Atomic, Continuous, Immediate, Dynamic', 'Atomic, Continuous, Immediate, Dynamic', current_timestamp(), current_timestamp());

INSERT INTO algorithm_questions (question_id, introduction, input_description, output_description, python_sample_code,
                                 javascript_sample_code, java_sample_code, created_at, updated_at)
VALUES
    (3, 'You are given two strings, A and B. Your task is to find the length of the longest common subsequence (LCS) between the two strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.',
     'Two strings A and B, each consisting of lowercase English letters.',
     'An integer representing the length of the longest common subsequence between A and B.',
     'def longestCommonSubsequence(n):\n\tpass #todo',
     'const longestCommonSubsequence = (n) => {\n\t //todo \n}',
     "class Solution {\n\tpublic int longestCommonSubsequence(String n) {\n\t\t//todo;\n\t}\n}", current_timestamp(), current_timestamp());

INSERT INTO algorithm_question_examples(algorithm_question_id, input, output, explanation, created_at, updated_at)
VALUES
    (1, 'A = "abcde", B = "ace"', '3', 'The longest common subsequence is "ace" with a length of 3', current_timestamp(), current_timestamp()),
    (1, 'A = "abc", B = "def"', '0', "There is no common subsequence between the two strings.", current_timestamp(), current_timestamp());

INSERT INTO algorithm_question_solutions(algorithm_question_id, description, code, time_complexity, space_complexity,
                                         relevant_resources, created_at, updated_at)
VALUES(1,
       'The first step is to build a hash map element -> its frequency. In Java, we use the data structure HashMap. Python provides a dictionary subclass Counter to initialize the hash map we need directly from the input array. This step takes O(N)\mathcal{O}(N)O(N) time where N is a number of elements in the list',
       "const isPrime = (n) => {
                                   if (n < 2) return false;

                                   for (let i = 2; i <= Math.sqrt(n); i += 1) {
                                       if (n % i === 0) return false;
                                   }

                                   return true;
                                   };",
       'O(n)', 'O(n)', 'https://www.geeksforgeeks.org/dynamic-programming/', current_timestamp(), current_timestamp());


INSERT INTO challenge_questions(challenge_id, question_id)
VALUES (1, 5);
-- COMMIT;