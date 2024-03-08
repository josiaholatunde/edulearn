const questionBank = [
    {
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
        title: "Longest Common Subsequence ?",
        type: 'algorithms',
        introduction: 'You are given two strings, A and B. Your task is to find the length of the longest common subsequence (LCS) between the two strings. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.',
        inputDescription: 'Two strings A and B, each consisting of lowercase English letters.',
        outputDescription: 'An integer representing the length of the longest common subsequence between A and B.',
        examples: [
            {
                input: 'A = "abcde", B = "ace"',
                output: '3',
                explanation: 'The longest common subsequence is "ace" with a length of 3'
            },
            {
                input: 'A = "abc", B = "def"',
                output: '0',
                explanation: 'There is no common subsequence between the two strings.'
            },
        ]
        
    },
];

export default questionBank