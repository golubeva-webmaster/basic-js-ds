const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {
  constructor() {
    this.head = null;
    this.last = null;
    this.size = 0;
  }

  getUnderlyingList() {
   return this.head;
  }

  enqueue( value ) {
    const newNode = new ListNode(value);
    if (this.size) {
      this.last.next = newNode;
    }
    else {
      this.head = newNode;      
    }

    this.last = newNode;
    this.size++;
    return this;
  }

  dequeue() {
    if (this.size === 0) return null;
    const del = this.head;
    if (this.head === this.last) {
      this.last = null;
    }
    this.head = this.head.next;
    this.size--;
    return del.value;
  }

}