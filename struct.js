// ------List

function printListFromTailToHead(head) {
  const array = [];
  while (head) {
    array.unshift(head.value);
    head = head.next;
  }

  return array;
}

function reverseList(head) {
  let headNextNode = head.next;
  let nextNode = null;
  head.next = null;
  while (headNextNode) {
    nextNode = headNextNode.next;
    headNextNode.next = head;
    head = headNextNode;
    headNextNode = nextNode;
  }

  return head;
}

function mergeList(list1, list2) {
  if (!list1) {
    return list2;
  }

  if (!list2) {
    return list1;
  }

  let head;

  if (list1.value < list2) {
    head = list1;
    head.next = mergeList(list1.next, list2);
  } else {
    head = list2;
    head.next = mergeList(list1, list2.next);
  }

  return head;
}

function findKthToTail(head, k) {
  if (!head || !k) return null;

  let front = head,
    behind = head;
  let index = 1;

  while (front.next) {
    index++;
    front = front.next;
    if (index > k) {
      behind = behind.next;
    }
  }

  return k <= index && behind;
}

function entryListOfLoop(head) {
  if (!head || !head.next) {
    return null;
  }

  let head1 = head.next,
    head2 = head.next.next;

  while (head1 !== head2) {
    if (head2 === null || head2.next === null) {
      return null;
    }
    head1 = head1.next;
    head2 = head2.next.next;
  }

  let temp = head1,
    head1 = head1.next,
    length = 1;

  while (temp != head1) {
    head1 = head1.next;
    length++;
  }

  head1 = head2 = head;
  while (length-- > 0) {
    head2 = head2.next;
  }

  while (head1 !== head2) {
    head1 = head1.next;
    head2 = head2.next;
  }

  return head1;
}

function findFirstCommonNode(list1, list2) {
  function getListLength(list) {
    let length = 0,
      current = list;
    while (current) {
      length++;
      current = current.next;
    }
  }

  if (!list1 || !list2) {
    return null;
  }

  let length1 = getListLength(list1);
  let length2 = getListLength(list2);

  let lang, short, interval;
  if (length1 > length2) {
    lang = list1;
    short = list2;
    interval = length1 - length2;
  } else {
    lang = list2;
    short = list1;
    interval = length2 - length1;
  }

  while (interval--) {
    lang = lang.next;
  }

  while (lang) {
    if (lang === short) {
      return lang;
    }
    lang = lang.next;
    short = short.next;
  }

  return null;
}

function lastRemaining_Solute(n, m) {
  if (n < 1 || m < 1) {
    return -1;
  }

  const array = [];
  let index = 0;
  for (let i = 0; i < n; i++) {
    array[i] = i;
  }

  while (array.length > 1) {
    index = ((index + m) % array.length) - 1;
    if (index >= 0) {
      array.splice(index, 1);
    } else {
      array.splice(array.length - 1, 1);
      index = 0;
    }
  }

  return array[0];
}

function deleteNode(head, node) {
  if (node.next) {
    node.value = node.next.value;
    node.next = node.next.next;
  } else if (node === head) {
    node = null;
    head = null;
  } else {
    node = head;
    while (node.next.next) {
      node.next = next;
    }
    node.next = null;
    node = null;
  }

  return node;
}

function deleteDuplicateNode(head) {
  const map = {};
  if (head && head.next) {
    let current = head;
    while (current) {
      const value = map[current.value];
      map[current.value] = value ? value + 1 : 1;
      current = current.next;
    }

    current = head;
    while (current) {
      const value = map[current.value];
      if (value > 1) {
        if (current.next) {
          current.value = current.next.value;
          current.next = current.next.next;
        } else if (current === head) {
          current = null;
          head = null;
        } else {
          current = head;
          while (current.next.next) {
            current = current.next;
          }
          current.next = null;
          current = null;
        }
      } else {
        current = current.next;
      }
    }
  }

  return head;
}

// ------Tree

function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

Node.prototype = {
  show: function() {
    console.log(this.data);
  }
};

function Tree() {
  this.root = null;
}

Tree.prototype = {
  insert: function(data) {
    var node = new Node(data, null, null);
    if (!this.root) {
      this.root = node;
      return;
    }

    var current = this.root,
      parent = null;
    while (current) {
      parent = current;
      if (data < current.left) {
        current = current.left;
        if (!current) {
          parent.left = node;
          return;
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = node;
          return;
        }
      }
    }
  },
  preOrder: function(node) {
    if (node) {
      node.show();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  },
  middleOrder: function(node) {
    if (node) {
      this.middleOrder(node.left);
      node.show();
      this.middleOrder(node.right);
    }
  },
  laterOrder: function(node) {
    if (node) {
      this.laterOrder(node.left);
      this.laterOrder(node.right);
      node.show();
    }
  },
  getMin: function() {
    var current = this.root;
    while (current) {
      if (!current.left) {
        return current;
      }
      current = current.left;
    }
  },
  getMax: function() {
    var current = this.root;
    while (current) {
      if (!current.right) {
        return current;
      }
      current = current.right;
    }
  },
  getDeep: function(node, deep) {
    deep = deep || 0;
    if (node === null) {
      return deep;
    }
    deep++;

    var dLeft = this.getDeep(node.left, deep);
    var dRight = this.getDeep(node.right, deep);

    return Math.max(dLeft, dRight);
  },
  getNode: function(data) {
    var root = this.root;

    if (root) {
      if (data === root.data) {
        return root;
      } else if (data > root.data) {
        root = root.right;
        return this.getNode(data);
      } else {
        root = root.left;
        return this.getNode(data);
      }
    } else {
      return null;
    }
  }
};

function binarySearch(data, arr, start, end) {
  if (start > end) {
    return -1;
  }
  var middle = Math.floor((start + end) / 2);
  if (data === arr[middle]) {
    return middle;
  } else if (data > arr[middle]) {
    return binarySearch(data, arr, middle + 1, end);
  } else {
    return binarySearch(data, arr, start, middle - 1);
  }
}

function inorderTraversal(root) {
  let stack = [],
    result = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.value);
    current = current.right;
  }

  return result;
}

function preorderTraversal(root) {
  let result = [],
    stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      result.push(current.value);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }
  return result;
}

function postorderTraversal(root) {
  let current = root;
  let stack = [],
    result = [];
  let last = null;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.value);
      last = current;
      current = null;
    } else {
      current = current.right;
    }
  }
}

function reConstructBinaryTree(pre, vin) {
  if (pre.length === 0) {
    return null;
  }

  if (pre.length === 1) {
    return new TreeNode(pre[0]);
  }

  const value = pre[0];
  const index = vin.indexOf(value);
  const vinLeft = vin.slice(0, index);
  const vinRight = vin.slice(index + 1);
  const preleft = pre.slice(1, index + 1);
  const preRight = pre.slice(index + 1);
  const node = new TreeNode(value);

  node.left = reConstructBinaryTree(preleft, vinLeft);
  node.right = reConstructBinaryTree(preRight, vinRight);

  return node;
}

function getHRD(pre, vin) {
  if (!pre) {
    return "";
  }
  if (pre.length === 1) {
    return pre[0];
  }

  const head = pre[0];
  const index = vin.indexOf(head);
  const preLeft = pre.slice(1, index + 1);
  const preRight = pre.slice(index + 1);
  const vinLeft = vin.slice(0, index);
  const vinRight = vin.slice(index + 1);

  return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
}

function isSymmetrical(pRoot) {
  function isSymmetricalTree(node1, node2) {
    if (!node1 && !node2) {
      return true;
    }

    if (!node1 || !node2) {
      return false;
    }

    if (node1.val !== node2.val) {
      return false;
    }

    return (
      isSymmetricalTree(node1.left, node2.right) &&
      isSymmetricalTree(node1.right, node2.left)
    );
  }

  return isSymmetricalTree(pRoot, pRoot);
}

function Mirror(root) {
  if (root) {
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    Mirror(root.left);
    Mirror(root.right);
  }
}

function kThNode(pRoot, k) {
  const arr = [];
  function loopThrough(pRoot, arr) {
    if (pRoot) {
      loopThrough(pRoot.left, arr);
      arr.push(pRoot);
      loopThrough(pRoot.right, arr);
    }
  }

  loopThrough(pRoot, arr);
  if (k > 0 && k < arr.length) {
    return arr[k - 1];
  }

  return null;
}

function verifySquenenceOfBST(squene) {
  let index = 0;
  if (squene && squene.length > 0) {
    var root = squene[squene.length - 1];
    for (let i = 0; i < squene.length - 1; i++) {
      if (squene[i] > root) {
        index = i;
        break;
      }
    }

    let left = true,
      right = true;
    let leftTree = squene.slice(0, index);
    let rightTree = squene.slice(index, squene.length - 1);
    left = verifySquenenceOfBST(leftTree);
    right = verifySquenenceOfBST(rightTree);

    return left && right;
  }
}

function TreeDepth(pRoot) {
  return !pRoot
    ? 0
    : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1;
}

// ------Array

function printMinNum(arr) {
  if (!arr || arr.length === 0) {
    return "";
  }

  function compare(a, b) {
    var ab = "" + a + b;
    var ba = "" + b + a;

    return ab - ba;
  }

  return arr.sort(compare).join("");
}

function reOrderArray(array) {
  if (Array.isArray(array)) {
    let start = 0,
      end = array.length - 1;
    while (start < end) {
      while (array[start] % 2 === 1) {
        start++;
      }
      while (array[end] % 2 === 0) {
        end++;
      }
      if (start < end) {
        let temp = array[start];
        array[start] = array[end];
        array[end] = temp;
      }
    }
  }

  return array;
}

function multiply(arr) {
  const result = []
  if (Array.isArray(arr) && arr.length > 0) {
    result[0] = 1
    for (let i = 1, i < arr.length; i++) {
      result[i] = result[i - 1] * arr[i - 1]
    }

    let temp = 1
    for (let i = arr.length - 2; i >= 0; i--) {
      temp = temp * arr[i + 1]
      result[i] = result[i] * temp
    }
  }

  return result
}

function findContinuousSequence(sum) {
  const result = []
  const child = [1,2]
  let big = 2;
  let small = 1
  let currentSum = 3
  while(big < sum) {
    while(currentSum < sum && big < sum) {
      child.push(++big)
      currentSum += big
    }
    if (currentSum === sum && child.length > 1) {
      result.push(child.slice())
      child.push(++big)
      currentSum += big
    }
    while(currentSum > sum && small < big) {
      child.unshift()
      currentSum -= small++
    }
  }

  return result
}

function findGreatestSumOfSubArray(array) {
  if (Array.isArray(array) && array.length > 0) {
    let max = array[0]
    let sum = array[0]
    for (let i = 0; i < array.length; i++) {
      if (sum < 0) {
        sum = array[i]
      } else {
        sum += array[i]
      }
      max = Math.max(max, sum)
    }

    return max
  }

  return 0
}

function twoSum(nums, target) {
  const map = {}
  if (Array.isArray(nums)) {
    for (let i = 0; i < nums.length; i++) {
      if (map[target - nums[i]] !== undefined) {
        return [map[target -nums[i]], i]
      } else {
        map[nums[i]] = i
      }
    }
  }
  return []
}

function threeSum(nums) {
  const result = []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    if (i && nums[i] === nums[i-1]) { continue }
    let left = i + 1
    let right = nums.length - 1
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum > 0) {
        right--
      } else if (sum < 0) {
        left++
      } else {
        result.push([nums[i], nums[left++], nums[right--]])
        while(nums[left] === nums[left - 1]) { left++ }
        while(nums[right] === nums[right + 1]) { right-- }
      }
    } 
  }

  return result
}

function fourSum(nums, target) {
  if (nums.length < 4) {
    return []
  }

  nums.sort((a, b) => a - b)
  const result = []

  for(let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && num[i] === nums[i-1]) {
      continue
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) { break }
    for(let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j-1]) {
        continue
      }
      let left = j + 1
      let right = nums.length - 1
      while(left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right]
        if (sum > target) {
          right--
        } else if (sum < target) {
          left++
        } else {
          result.push([nums[i], nums[j], nums[left++], nums[right--]])
          while(nums[left] === nums[left-1]) { left++ }
          while(nums[right] === nums[right + 1]) { right-- }
        }
      }
    }
  }
  return result
}

// ------String

function replaceSpace(str) {
  return str.replace(/\s+/g, '%20')
}

// ------Stack

function minStack() {
  var dataStack = []
  var minStack = []

  function push(node) {
    dataStack.push(node)
    if (minStack.length === 0 || node < min()) {
      minStack.push(node)
    } else {
      minStack.push(node)
    }
  }

  function pop() {
    minStack.pop()
    return dataStack.pop()
  }

  function min() {
    var len = minStack.length
    return len && minStack[len - 1]
  }
}

function quene() {
  var stack1 = [], stack2 = []

  function push(node) {
    stack1.push(node)
  }

  function pop() {
    if (stack.length === 0) {
      while(stack1.length > 0) {
        stack2.push(stack1.pop())
      }
    }
    return stack2.pop() || null
  }
}