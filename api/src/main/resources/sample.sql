-- Insert data for Quiz 1: Databases
INSERT INTO challenges (title, category, friendly_type, type, level, created_by, start_date, end_date, submissions)
VALUES
    ('Databases', 'databases', 'Multiple Choice', 'MULTIPLE_CHOICE', 10, 'ADMIN', '2024-02-22', '2024-03-22', 102),
    ('Mock Test', 'system_design', 'Algorithms', 'ALGORITHMS', 9, 'ADMIN', '2024-02-22', '2024-03-22', 1020),
    ('Dynamic Programming', 'dynamic_programming', 'Algorithms', 'ALGORITHMS', 10, 'ADMIN', '2024-02-22', '2024-03-22', 20),
    ('Graph Theory', 'graph_theory', 'Multiple Choice', 'MULTIPLE_CHOICE', 9, 'ADMIN', '2024-02-22', '2024-03-22', 200);

-- Insert multiple choice questions for Challenge 1: Databases
INSERT INTO multiple_choice_questions (title, category, level, has_multiple_answers)
VALUES
    ('Which of these is a valid DDL (Data definition language) statement ?', 'databases', 10, false),
    ('Which of the following is not a type of database model?', 'databases',10, false),
    ('What does SQL stand for ?', 'databases', 10, false),
    ('What does ACID stand for in database transactions?', 'databases', 10, false);

-- Insert options for question 1
INSERT INTO multiple_choice_question_options (title, value, question_id)
VALUES
    ('SELECT', 'SELECT', 1),
    ('UPDATE', 'UPDATE', 1),
    ('ALTER', 'ALTER', 1),
    ('DELETE', 'DELETE', 1);

-- Insert options for question 2
INSERT INTO multiple_choice_question_options (question_id, title, value)
VALUES
    (2, 'Relational', 'Relational'),
    (2, 'Hierarchical', 'Hierarchical'),
    (2, 'Network', 'Network'),
    (2, 'Linear', 'Linear');

-- Insert options for question 3
INSERT INTO multiple_choice_question_options (question_id, title, value)
VALUES
    (3, 'Structured Query Language', 'Structured Query Language'),
    (3, 'Hierarchical', 'Hierarchical'),
    (3, 'Sequential Query Language', 'Sequential Query Language'),
    (3, ' Standard Query Language', ' Standard Query Language');

-- Insert options for question 4
INSERT INTO multiple_choice_question_options (question_id, title, value)
VALUES
    (4, 'Atomicity, Consistency, Isolation, Durability', 'Atomicity, Consistency, Isolation, Durability'),
    (4, 'All Columns Identified Directly', 'Hierarchical'),
    (4, 'Automated Control of Information and Data', 'Sequential Query Language'),
    (4, 'Atomic, Continuous, Immediate, Dynamic', 'Atomic, Continuous, Immediate, Dynamic');

INSERT INTO algorithm_questions (title, category, introduction, inputDescription, outputDescription, pythonSampleCode,
                                 javascriptSampleCode, javaSampleCode, level)
VALUES
    ('Longest Common Subsequence', 'dynamic_programming', 'You are given two strings, A and B. Your task is to find the length of the longest common subsequence (LCS) between the two strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.',
     'Two strings A and B, each consisting of lowercase English letters.',
     'An integer representing the length of the longest common subsequence between A and B.',
     'def longestCommonSubsequence(n):\n\tpass #todo',
     'const longestCommonSubsequence = (n) => {\n\t //todo \n}',
     "class Solution {\n\tpublic int longestCommonSubsequence(String n) {\n\t\t//todo;\n\t}\n}",
     10);

INSERT INTO algorithm_question_examples(question_id, input, output, explanation)
VALUES
    (1, 'A = "abcde", B = "ace"', '3', 'The longest common subsequence is "ace" with a length of 3'),
    (1, 'A = "abc", B = "def"', '0', "There is no common subsequence between the two strings.");

INSERT INTO algorithm_question_solutions(question_id, description, code, time_complexity, space_complexity,
                                         relevant_resources)
VALUES(1,
       'The first step is to build a hash map element -> its frequency. In Java, we use the data structure HashMap. Python provides a dictionary subclass Counter to initialize the hash map we need directly from the input array. This step takes O(N)\mathcal{O}(N)O(N) time where N is a number of elements in the list',
       "const isPrime = (n) => {
                                   if (n < 2) return false;

                                   for (let i = 2; i <= Math.sqrt(n); i += 1) {
                                       if (n % i === 0) return false;
                                   }

                                   return true;
                                   };",
       'O(n)', 'O(n)', 'https://www.geeksforgeeks.org/dynamic-programming/');