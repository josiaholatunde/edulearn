const questionBank = [
    {
        id: 1,
        category: 'sorting',
        title: "What is the time complexity of the Quick sort algorithm in the worst case ?",
        type: 'multiple_choice',
        options: [
            {
                id: 1,
                title: "O(n)",
                value: "O(n)",
            },
            {
                id: 2,
                title: "O(nlogn)",
                value: "O(nlogn)",
            },
            {
                id: 3,
                title: "O(n ^ 2)",
                value: "O(n ^ 2)",
            },
            {
                id: 4,
                title: "O(n)",
                value: "O(logn)",
            },
        ],
    },
    {
        id: 2,
        category: 'sorting',
        title: "What is the time complexity of the Merge sort algorithm in the worst case ?",
        type: 'multiple_choice',
        options: [
            {
                id: 1,
                title: "O(n)",
                value: "O(n)",
            },
            {
                id: 2,
                title: "O(nlogn)",
                value: "O(nlogn)",
            },
            {
                id: 3,
                title: "O(n ^ 2)",
                value: "O(n ^ 2)",
            },
            {
                id: 4,
                title: "O(n)",
                value: "O(logn)",
            },
        ],
    },
    {
        id: 3,
        category: 'sorting',
        title: "What is the time complexity of the Partition function of the quick sort algorithm in the worst case ?",
        type: 'multiple_choice',
        options: [
            {
                id: 1,
                title: "O(n)",
                value: "O(n)",
            },
            {
                id: 2,
                title: "O(nlogn)",
                value: "O(nlogn)",
            },
            {
                id: 3,
                title: "O(n ^ 2)",
                value: "O(n ^ 2)",
            },
            {
                id: 4,
                title: "O(n)",
                value: "O(logn)",
            },
        ],
    },
    {
        id: 4,
        category: 'search',
        title: "Which of the following algorithms is the most efficient for searching for an item within a sorted array ?",
        type: 'multiple_choice',
        options: [
            {
                id: 1,
                title: "Binary Search",
                value: "Binary Search",
            },
            {
                id: 2,
                title: "Linear Search",
                value: "Linear Search",
            },
            {
                id: 3,
                title: "Heap Sort",
                value: "Heap Sort",
            },
            {
                id: 4,
                title: "Quick Sort",
                value: "Quick Sort"
            },
        ],
    },
    {
        id: 5,
        title: "Longest Common Subsequence",
        category: 'dynamic_programming',
        type: 'algorithms',
        level: 10,
        introduction: 'You are given two strings, A and B. Your task is to find the length of the longest common subsequence (LCS) between the two strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.',
        inputDescription: 'Two strings A and B, each consisting of lowercase English letters.',
        outputDescription: 'An integer representing the length of the longest common subsequence between A and B.',
        examples: [
            {
                id: 1,
                input: 'A = "abcde", B = "ace"',
                output: '3',
                explanation: 'The longest common subsequence is "ace" with a length of 3'
            },
            {
                id: 2,
                input: 'A = "abc", B = "def"',
                output: '0',
                explanation: 'There is no common subsequence between the two strings.'
            },
        ],
        pythonSampleCode: 'def longestCommonSubsequence(n):\n\tpass #todo',
        javascriptSampleCode: 'const longestCommonSubsequence = (n) => {\n\t //todo \n}',
        javaSampleCode: "class Solution {\n\tpublic int longestCommonSubsequence(String n) {\n\t\t//todo;\n\t}\n}",
        solution: {
            description: 'The first step is to build a hash map element -> its frequency. In Java, we use the data structure HashMap. Python provides a dictionary subclass Counter to initialize the hash map we need directly from the input array. This step takes O(N)\mathcal{O}(N)O(N) time where N is a number of elements in the list',
            solutionCode: `const isPrime = (n) => {
                            if (n < 2) return false;
                            
                            for (let i = 2; i <= Math.sqrt(n); i += 1) {
                                if (n % i === 0) return false;
                            }
                            
                            return true;
                            };`,
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            relevantResources: ['https://www.geeksforgeeks.org/dynamic-programming/']

        },
        tags: ['Algorithmic']  
    },
    {
        id: 6,
        category: 'databases',
        title: "Which of these is a valid DDL (Data definition language) statement ?",
        type: 'multiple_choice',
        options: [
            {
                id: 1,
                title: "SELECT",
                value: "SELECT",
            },
            {
                id: 2,
                title: "UPDATE",
                value: "UPDATE",
            },
            {
                id: 3,
                title: "ALTER",
                value: "ALTER",
            },
            {
                id: 4,
                title: "DELETE",
                value: "DELETE",
            },
        ],
    },
];

export default questionBank