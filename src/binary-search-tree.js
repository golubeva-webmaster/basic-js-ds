const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if(!this.rootNode){
        this.rootNode = newNode;
        return this;
    }
    let currentNode = this.rootNode;
    while(currentNode){
        if(data === currentNode.data) return undefined;
        if(data < currentNode.data){
            if(!currentNode.left){
                currentNode.left = newNode;
                return this;
            }
            currentNode = currentNode.left;
        } else if(data > currentNode.data){
            if(!currentNode.right){
                currentNode.right = newNode;
                return this;
            } 
            currentNode = currentNode.right;
        }
    }
  }

  has(data) {
    let currentNode = this.rootNode;
    while(currentNode){
        if(data === currentNode.data) {
          return true;
        } else if(data < currentNode.data){
          currentNode = currentNode.left; // смещаемся влево
        } else {
          currentNode = currentNode.right; // смещаемся вправо
        }
    }
    return false;
  }

  find(data) {
    if(this.rootNode) {
      
      let currentNode = this.rootNode;
      let findNode = false;

      while(currentNode && !findNode){
        if(data < currentNode.data){
          currentNode = currentNode.left; // смещаемся влево
        } else if(data > currentNode.data){
            currentNode = currentNode.right; // смещаемся вправо
          } else {
            findNode = currentNode; // нашли
        } 
      }
      return (!findNode) ? null : findNode;
    } else{
      return null;
    }
  }

  findMinLeaf(leaf) {
    return (!leaf.left) ? leaf : this.findMinLeaf(leaf.left);
  }

  remove(data) {
      this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(currentNode, value) {

    if(value < currentNode.data) {
        currentNode.left = this.removeNode(currentNode.left, value);
    } else if(value > currentNode.data){
        currentNode.right = this.removeNode(currentNode.right, value);
    } else {

      if(currentNode.left  === null && currentNode.right === null) {
          currentNode = null;
          return currentNode;
      }

      if(currentNode.left === null) {
          currentNode = currentNode.right;
          return currentNode;
      }

      if(currentNode.right === null) {
          currentNode = currentNode.left;
          return currentNode;
      }

      let min = this.findMinLeaf(currentNode.right);
      currentNode.data = min.data;
      currentNode.right = this.removeNode(currentNode.right, min.data);

    }
    return currentNode;
  }

  min() {
    let currentValue = this.rootNode;
    let minValue = this.rootNode.data;

    while(currentValue !== null){
      minValue = currentValue.data;
      currentValue = currentValue.left;
    }

    return minValue;
  }

  max() {
    let currentValue = this.rootNode;
    let maxValue = this.rootNode.data;

    while(currentValue !== null){
      maxValue = currentValue.data;
      currentValue = currentValue.right;
    }

    return maxValue;
  }

}