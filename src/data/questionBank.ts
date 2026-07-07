export interface MCQQuestion {
  id: string;
  type: "mcq";
  question: string;
  options: string[];
  answer: string; // The exact option text that is correct
}

export interface TFQuestion {
  id: string;
  type: "tf";
  question: string;
  answer: boolean; // true or false
}

export interface FIBQuestion {
  id: string;
  type: "fib";
  question: string;
  answer: string; // The correct term
}

export type Question = MCQQuestion | TFQuestion | FIBQuestion;

export const mcqQuestions: MCQQuestion[] = [
  {
    id: "mcq_1",
    type: "mcq",
    question: "What is a Doubly Linked List?",
    options: [
      "a non-linear data structure completely unrelated to singly linked lists",
      "a data structure identical to an array",
      "a linear data structure similar to a singly linked list, but each node contains two pointers instead of one"
    ],
    answer: "a linear data structure similar to a singly linked list, but each node contains two pointers instead of one"
  },
  {
    id: "mcq_2",
    type: "mcq",
    question: "What is the name of the search operation covered in the lab?",
    options: ["Searching for a Key", "Displaying the Linked List", "Reversing the List"],
    answer: "Searching for a Key"
  },
  {
    id: "mcq_3",
    type: "mcq",
    question: "In insertAtEnd, what happens when the doubly linked list is empty?",
    options: [
      "only head is updated, tail is left unchanged",
      "head and tail are both set to point to the new node",
      "only tail is updated, head is left unchanged"
    ],
    answer: "head and tail are both set to point to the new node"
  },
  {
    id: "mcq_4",
    type: "mcq",
    question: "What is the parameterized Node constructor in the lab's Doubly Linked List code?",
    options: [
      "Node(int val) : data(val), next(NULL), prev(NULL) {}",
      "Node(string val) : data(val), next(NULL), prev(NULL) {}",
      "Node(int val) : data(val), next(nullptr), prev(0) {}"
    ],
    answer: "Node(int val) : data(val), next(NULL), prev(NULL) {}"
  },
  {
    id: "mcq_5",
    type: "mcq",
    question: "As per the lab content, what pointers does a doubly linked list node have?",
    options: [
      "a pointer to itself and no other node",
      "a pointer to the next node as well as a pointer to the previous node",
      "two pointers, both pointing to the next node"
    ],
    answer: "a pointer to the next node as well as a pointer to the previous node"
  },
  {
    id: "mcq_6",
    type: "mcq",
    question: "What members does the lab's DoublyLinkedList class have?",
    options: [
      "Node* head; Node* tail;",
      "Node* start; Node* end;",
      "Node* head; Node* prev;"
    ],
    answer: "Node* head; Node* tail;"
  },
  {
    id: "mcq_7",
    type: "mcq",
    question: "What does DeletionFromEnd refer to?",
    options: [
      "removing the first node (head) of the linked list",
      "removing the last node (tail) of the linked list",
      "searching for a node at the end of the list"
    ],
    answer: "removing the last node (tail) of the linked list"
  },
  {
    id: "mcq_8",
    type: "mcq",
    question: "According to the lab material, what does the last node in a singly linked list typically point to?",
    options: [
      "typically points back to the head node to form a loop",
      "typically points to NULL to indicate the end of the list",
      "typically points to the previous node only"
    ],
    answer: "typically points to NULL to indicate the end of the list"
  },
  {
    id: "mcq_9",
    type: "mcq",
    question: "What does the Data part of a node hold?",
    options: [
      "must always be empty until the list is deleted",
      "holds the actual value or data that you want to store in the list, and can be any data type such as integers, characters, or custom data structures",
      "holds only the memory address of the node itself"
    ],
    answer: "holds the actual value or data that you want to store in the list, and can be any data type such as integers, characters, or custom data structures"
  },
  {
    id: "mcq_10",
    type: "mcq",
    question: "What does the Delete function do in a Circular Linked List?",
    options: [
      "remove a node with a given value from the circular linked list",
      "reverse a node with a given value in the circular linked list",
      "print a node with a given value in the circular linked list"
    ],
    answer: "remove a node with a given value from the circular linked list"
  },
  {
    id: "mcq_11",
    type: "mcq",
    question: "According to the lab material, what does the Insert function do in a Circular Linked List?",
    options: [
      "search for a node at a specific position",
      "print a node at a specific position",
      "add a new node at a specific position in the circular linked list"
    ],
    answer: "add a new node at a specific position in the circular linked list"
  },
  {
    id: "mcq_12",
    type: "mcq",
    question: "Which helper functions are commonly implemented for a Circular Linked List?",
    options: [
      "Connect, Disconnect, and Ping",
      "Append, Insert, Delete, Search, Display, and Reverse",
      "Compile, Debug, and Execute"
    ],
    answer: "Append, Insert, Delete, Search, Display, and Reverse"
  },
  {
    id: "mcq_13",
    type: "mcq",
    question: "What does the Search function do in a Circular Linked List?",
    options: [
      "add a node with a specific value in the circular linked list",
      "find a node with a specific value in the circular linked list",
      "display the entire circular linked list regardless of value"
    ],
    answer: "find a node with a specific value in the circular linked list"
  },
  {
    id: "mcq_14",
    type: "mcq",
    question: "What does the pointer to the next node in a singly linked list contain and allow?",
    options: [
      "allows traversal only backward, from the last node to the head",
      "contains a reference or pointer to the next node in the list, helping maintain the structure and allowing unidirectional traversal from the head to the last node",
      "contains a reference to the previous node only, not the next"
    ],
    answer: "contains a reference or pointer to the next node in the list, helping maintain the structure and allowing unidirectional traversal from the head to the last node"
  },
  {
    id: "mcq_15",
    type: "mcq",
    question: "In insertAtEnd, what happens when the doubly linked list is not empty?",
    options: [
      "head->next is set to the new node, and head is updated to the new node",
      "the new node's next is set to head, and head is updated",
      "tail->next is set to the new node, the new node's prev is set to tail, and then tail is updated to the new node"
    ],
    answer: "tail->next is set to the new node, the new node's prev is set to tail, and then tail is updated to the new node"
  },
  {
    id: "mcq_16",
    type: "mcq",
    question: "According to the lab material, how does a circular linked list differ from a singly linked list regarding the last node?",
    options: [
      "in a circular linked list, the last node deletes itself automatically",
      "in a circular linked list, the last node points back to the first node, creating a loop, instead of pointing to null",
      "in a circular linked list, every node points to null except the head"
    ],
    answer: "in a circular linked list, the last node points back to the first node, creating a loop, instead of pointing to null"
  },
  {
    id: "mcq_17",
    type: "mcq",
    question: "What is the DoublyLinkedList constructor in the lab's code?",
    options: [
      "DoublyLinkedList() : head(NULL), tail(NULL) {}",
      "DoublyLinkedList() : head(NULL), tail(0) {}",
      "DoublyLinkedList() : head(NULL) {} without tail"
    ],
    answer: "DoublyLinkedList() : head(NULL), tail(NULL) {}"
  },
  {
    id: "mcq_18",
    type: "mcq",
    question: "What does the Reverse function do in a Circular Linked List?",
    options: [
      "duplicate the order of nodes in the circular linked list",
      "display the order of nodes without changing it",
      "reverse the order of nodes in the circular linked list"
    ],
    answer: "reverse the order of nodes in the circular linked list"
  },
  {
    id: "mcq_19",
    type: "mcq",
    question: "What is the operation for visiting and printing all nodes called?",
    options: [
      "Removal of Nodes: Deletion",
      "Creating a Linked List",
      "Displaying the Linked List/Traversal"
    ],
    answer: "Displaying the Linked List/Traversal"
  },
  {
    id: "mcq_20",
    type: "mcq",
    question: "At which positions can a node be added to a linked list?",
    options: [
      "at the front (beginning), the end (tail), or at any specified position within the list",
      "only in the exact middle of the list",
      "only at randomly chosen positions"
    ],
    answer: "at the front (beginning), the end (tail), or at any specified position within the list"
  },
  {
    id: "mcq_21",
    type: "mcq",
    question: "What is the default Node constructor in the lab's Doubly Linked List code?",
    options: [
      "Node() : data(0), next(NULL), prev(NULL) {}",
      "Node() : data(0), next(0), prev(0) {}",
      "Node() : data(0), next(NULL) {}"
    ],
    answer: "Node() : data(0), next(NULL), prev(NULL) {}"
  },
  {
    id: "mcq_22",
    type: "mcq",
    question: "What does DeletionFromStart refer to?",
    options: [
      "searching for a node at the start of the list",
      "removing the first node (head) of the linked list",
      "adding a new node at the start of the list"
    ],
    answer: "removing the first node (head) of the linked list"
  },
  {
    id: "mcq_23",
    type: "mcq",
    question: "What does the bidirectional connectivity of a doubly linked list allow?",
    options: [
      "connectivity that requires deleting nodes before traversal",
      "bidirectional connectivity that allows traversal in both forward and backward directions",
      "connectivity that only allows traversal in a circular loop"
    ],
    answer: "bidirectional connectivity that allows traversal in both forward and backward directions"
  },
  {
    id: "mcq_24",
    type: "mcq",
    question: "How is InsertionAtStart referred to in the lab?",
    options: ["Search", "Prepend", "Append"],
    answer: "Append"
  },
  {
    id: "mcq_25",
    type: "mcq",
    question: "What does the Display function do in a Circular Linked List?",
    options: [
      "insert new elements into the circular linked list",
      "print the elements of the circular linked list",
      "sort the elements of the circular linked list"
    ],
    answer: "print the elements of the circular linked list"
  },
  {
    id: "mcq_26",
    type: "mcq",
    question: "What two parts does a singly linked list node consist of?",
    options: [
      "two parts: Pointer to Next Node and Pointer to Previous Node",
      "two parts: Data and a Pointer to the Next Node",
      "four parts: Data, Next, Previous, and Head"
    ],
    answer: "two parts: Data and a Pointer to the Next Node"
  },
  {
    id: "mcq_27",
    type: "mcq",
    question: "How are linked list elements stored compared to array elements?",
    options: [
      "linked list elements are always stored at a contiguous location, just like arrays",
      "linked list elements are not stored at a contiguous location; the elements are linked using pointers",
      "linked list elements are stored only in the cloud"
    ],
    answer: "linked list elements are not stored at a contiguous location; the elements are linked using pointers"
  },
  {
    id: "mcq_28",
    type: "mcq",
    question: "What type of data structure is a Linked List?",
    options: ["a linear data structure", "a type of database index", "a type of hash table"],
    answer: "a linear data structure"
  },
  {
    id: "mcq_29",
    type: "mcq",
    question: "What does the head of a linked list refer to?",
    options: ["a pointer stored outside the list entirely", "the first node", "a temporary node used only during deletion"],
    answer: "the first node"
  },
  {
    id: "mcq_30",
    type: "mcq",
    question: "What operation is described for inserting a node at any position?",
    options: ["DeleteAfter/Delete at any Position", "Search for a Key", "InsertAfter/Insert at any Position"],
    answer: "InsertAfter/Insert at any Position"
  },
  {
    id: "mcq_31",
    type: "mcq",
    question: "What operation is described for removing a node at any position?",
    options: ["Displaying the Linked List", "Reversing the Circular List", "DeleteAfter/Delete at any position"],
    answer: "DeleteAfter/Delete at any position"
  },
  {
    id: "mcq_32",
    type: "mcq",
    question: "How is InsertionAtTail referred to in the lab?",
    options: ["Append", "Reverse", "Delete"],
    answer: "Append"
  },
  {
    id: "mcq_33",
    type: "mcq",
    question: "What does the Append function do in a Circular Linked List?",
    options: [
      "search for a node with a specific value",
      "add a new node to the end of the circular linked list",
      "add a new node to the beginning of the circular linked list only"
    ],
    answer: "add a new node to the end of the circular linked list"
  },
  {
    id: "mcq_34",
    type: "mcq",
    question: "What members does the lab's doubly linked list Node class have?",
    options: [
      "float data; Node next; Node prev;",
      "int data; Node* next; Node* prev;",
      "int data; Node* next; only, no prev pointer"
    ],
    answer: "int data; Node* next; Node* prev;"
  },
  {
    id: "mcq_35",
    type: "mcq",
    question: "From which positions can an element be removed during deletion?",
    options: [
      "only from the front of the list, never elsewhere",
      "from the front (beginning), the end (tail), or from any specified position within the list",
      "only from a position chosen by the operating system"
    ],
    answer: "from the front (beginning), the end (tail), or from any specified position within the list"
  }
];

export const tfQuestions: TFQuestion[] = [
  {
    id: "tf_1",
    type: "tf",
    question: "The parameterized Node constructor in the lab's code is Node(int val) : data(val), next(NULL), prev(NULL) {}.",
    answer: true
  },
  {
    id: "tf_2",
    type: "tf",
    question: "DeletionFromEnd refers to removing the first node (head) of the linked list.",
    answer: false
  },
  {
    id: "tf_3",
    type: "tf",
    question: "The lab describes an operation called Search for a Key for inserting nodes.",
    answer: false
  },
  {
    id: "tf_4",
    type: "tf",
    question: "The lab covers an operation called Displaying the Linked List/Traversal.",
    answer: true
  },
  {
    id: "tf_5",
    type: "tf",
    question: "The lab describes an operation called Searching for a Key for removing nodes.",
    answer: false
  },
  {
    id: "tf_6",
    type: "tf",
    question: "The Insert function in a Circular Linked List adds a new node at a specific position.",
    answer: true
  },
  {
    id: "tf_7",
    type: "tf",
    question: "In a circular linked list, there is no last node at all.",
    answer: false
  },
  {
    id: "tf_8",
    type: "tf",
    question: "The Search function in a Circular Linked List adds a node with a specific value.",
    answer: false
  },
  {
    id: "tf_9",
    type: "tf",
    question: "The lab describes an operation called DeleteAfter/Delete at any Position for inserting nodes.",
    answer: false
  },
  {
    id: "tf_10",
    type: "tf",
    question: "The doubly linked list has no connectivity between nodes at all.",
    answer: false
  },
  {
    id: "tf_11",
    type: "tf",
    question: "The last node in a singly linked list typically points to a random node in memory.",
    answer: false
  },
  {
    id: "tf_12",
    type: "tf",
    question: "The Data part of a node holds only the memory address of the node itself.",
    answer: false
  },
  {
    id: "tf_13",
    type: "tf",
    question: "Like arrays, a Linked List is a linear data structure.",
    answer: true
  },
  {
    id: "tf_14",
    type: "tf",
    question: "The DoublyLinkedList constructor in the lab's code is DoublyLinkedList(int val) : head(NULL), tail(NULL) {}.",
    answer: false
  },
  {
    id: "tf_15",
    type: "tf",
    question: "The Display function in a Circular Linked List prints the elements of the list.",
    answer: true
  },
  {
    id: "tf_16",
    type: "tf",
    question: "Unlike a regular singly linked list, in a circular linked list the last node always points to null, exactly like a singly linked list.",
    answer: false
  },
  {
    id: "tf_17",
    type: "tf",
    question: "In insertAtEnd, if the list is not empty, the new node's next is set to head, and head is updated.",
    answer: false
  },
  {
    id: "tf_18",
    type: "tf",
    question: "The Display function in a Circular Linked List reverses the elements of the list.",
    answer: false
  },
  {
    id: "tf_19",
    type: "tf",
    question: "The Delete function in a Circular Linked List duplicates a node with a given value.",
    answer: false
  },
  {
    id: "tf_20",
    type: "tf",
    question: "A singly linked list node consists of four parts: Data, Next, Previous, and Head.",
    answer: false
  },
  {
    id: "tf_21",
    type: "tf",
    question: "Adding a node to a linked list involves inserting an element at the front (beginning), the end (tail), or at any specified position within the list.",
    answer: true
  },
  {
    id: "tf_22",
    type: "tf",
    question: "In the lab, InsertionAtTail is referred to as Prepend.",
    answer: false
  },
  {
    id: "tf_23",
    type: "tf",
    question: "A doubly linked list node has two pointers, both pointing to the next node.",
    answer: false
  },
  {
    id: "tf_24",
    type: "tf",
    question: "A Doubly Linked List is a linear data structure similar to a singly linked list, but each node contains two pointers instead of one.",
    answer: true
  },
  {
    id: "tf_25",
    type: "tf",
    question: "The last node in a singly linked list typically deletes itself automatically.",
    answer: false
  }
];

export const fibQuestions: FIBQuestion[] = [
  {
    id: "fib_1",
    type: "fib",
    question: "In the lab's code, the DoublyLinkedList class stores pointers to Node named head and ___",
    answer: "tail"
  },
  {
    id: "fib_2",
    type: "fib",
    question: "The Reverse function ___ the order of nodes in the circular linked list.",
    answer: "reverses"
  },
  {
    id: "fib_3",
    type: "fib",
    question: "The DoublyLinkedList class has member pointers named head and ___",
    answer: "tail"
  },
  {
    id: "fib_4",
    type: "fib",
    question: "The default Node constructor initializes data to ___, and next and prev to NULL.",
    answer: "0"
  },
  {
    id: "fib_5",
    type: "fib",
    question: "Unlike a singly linked list, each node in a Doubly Linked List has ___ pointers.",
    answer: "two"
  },
  {
    id: "fib_6",
    type: "fib",
    question: "If tail is nullptr in insertAtEnd, head and tail are both set to the ___ node.",
    answer: "new"
  },
  {
    id: "fib_7",
    type: "fib",
    question: "In a linked list, elements are linked using ___ instead of being stored contiguously.",
    answer: "pointers"
  },
  {
    id: "fib_8",
    type: "fib",
    question: "The parameterized Node constructor sets data to ___, while next and prev are set to NULL.",
    answer: "val"
  },
  {
    id: "fib_9",
    type: "fib",
    question: "Unlike a singly linked list, a circular linked list's last node does not point to null but instead forms a ___",
    answer: "loop"
  },
  {
    id: "fib_10",
    type: "fib",
    question: "A deletion operation can remove an element from the front, the end, or from any specified ___",
    answer: "position"
  },
  {
    id: "fib_11",
    type: "fib",
    question: "In a Circular Linked List, Reverse changes the ___ of the nodes.",
    answer: "order"
  },
  {
    id: "fib_12",
    type: "fib",
    question: "InsertionAtStart is also labeled as ___ in the lab.",
    answer: "Append"
  },
  {
    id: "fib_13",
    type: "fib",
    question: "The next-node pointer helps maintain the list's structure and allows traversal starting from the ___",
    answer: "head"
  },
  {
    id: "fib_14",
    type: "fib",
    question: "In a circular linked list, the last node points back to the ___ node, creating a loop.",
    answer: "first"
  },
  {
    id: "fib_15",
    type: "fib",
    question: "In a Circular Linked List, Append is used to add a new node to the ___",
    answer: "end"
  },
  {
    id: "fib_16",
    type: "fib",
    question: "After linking tail->next to the new node, the ___ pointer is updated to point to the new node.",
    answer: "tail"
  },
  {
    id: "fib_17",
    type: "fib",
    question: "Deleting a node at any position is called DeleteAfter/Delete at any ___",
    answer: "position"
  },
  {
    id: "fib_18",
    type: "fib",
    question: "The Insert function adds a new node at a specific ___ in the circular linked list.",
    answer: "position"
  },
  {
    id: "fib_19",
    type: "fib",
    question: "The operation of inserting a node at the tail is labeled ___ in the lab.",
    answer: "Append"
  },
  {
    id: "fib_20",
    type: "fib",
    question: "The DeletionFromStart operation removes the node located at the ___ of the list.",
    answer: "start"
  },
  {
    id: "fib_21",
    type: "fib",
    question: "One of the operations in the lab is titled Searching for a ___",
    answer: "Key"
  },
  {
    id: "fib_22",
    type: "fib",
    question: "In insertAtEnd (non-empty list), tail->next is set to the new node, and the new node's prev is set to ___",
    answer: "tail"
  },
  {
    id: "fib_23",
    type: "fib",
    question: "Append, Insert, Delete, Search, Display, and Reverse are all ___ functions for a Circular Linked List.",
    answer: "helper"
  },
  {
    id: "fib_24",
    type: "fib",
    question: "The lab describes inserting a node at any position as ___/Insert at any Position.",
    answer: "InsertAfter"
  },
  {
    id: "fib_25",
    type: "fib",
    question: "A Circular Linked List connects its nodes in a ___ fashion.",
    answer: "circular"
  }
];

/**
 * Utility function to shuffle an array.
 * Highly robust implementation to prevent bias or mutation.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a completely randomized, unique test of exactly 15 questions:
 * - 8 Multiple Choice Questions
 * - 4 True and False Questions
 * - 3 Fill in the Blanks
 * 
 * Includes thorough shuffling of question selection, final question order,
 * and even option order for Multiple Choice Questions.
 */
export function generateTest(): Question[] {
  // 1. Pick 8 unique random MCQs
  const shuffledMCQs = shuffleArray(mcqQuestions).slice(0, 8);
  // Prepare MCQs by shuffling their options
  const preparedMCQs: MCQQuestion[] = shuffledMCQs.map((q) => {
    return {
      ...q,
      options: shuffleArray(q.options)
    };
  });

  // 2. Pick 4 unique random True/False questions
  const preparedTFs = shuffleArray(tfQuestions).slice(0, 4);

  // 3. Pick 3 unique random Fill-in-the-blank questions
  const preparedFIBs = shuffleArray(fibQuestions).slice(0, 3);

  // Combine and shuffle everything
  const combined = [...preparedMCQs, ...preparedTFs, ...preparedFIBs];
  return shuffleArray(combined);
}
