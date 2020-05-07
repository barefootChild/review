// 无重复数字的最长子串
function lengthOfLongestSubstring(s) {
  let str = ''
  let size = 0
  const len = s.length
  for (let i = 0; i < len; i++) {
    let char = s.charAt(i)
    let index = str.indexOf(char)
    if (index < 0) {
      str += char
      size = size < str.length ? str.length : size
    } else {
      str = str.substr(index + 1) + char
    }
  }

  return size
}

// 最长公共前缀
function longestCommonPrefix(strs) {
  if (strs.length === 0) return ''
  let curr = strs[0]
  for (let str of strs) {
    let temp = ''
    for (let i = 0, j = 0, leni = curr.length, lenj = str.length; i < leni & j < lenj; i++, j++) {
      if (curr[i] !== str[j]) {
        break
      } else {
        temp += str[j]
      }
    }
    curr = temp
  }
  return curr
}

// 字符串的排列
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) {
      return false
  }

  if (s1.length === 1) {
      return s2.indexOf(s1) >= 0
  }

  const book = {}, myBook = {}

  for (let i = 0; i < s1.length; i++) {
      book[s1.charAt(i)] ? book[s1.charAt(i)]++ : book[s1.charAt(i)] = 1
      myBook[s2.charAt(i)] ? myBook[s2.charAt(i)]++ : myBook[s2.charAt(i)] = 1
  }

  for (let i = s1.length; i <= s2.length; i++) {
      if (check(book, myBook)) {
      return true    
      } else {
          myBook[s2.charAt(i - s1.length)]--
          myBook[s2.charAt(i)] ? myBook[s2.charAt(i)]++ : myBook[s2.charAt(i)] = 1
      }
  }

  return false

  function check(obj1, obj2) {
    for (let key in obj1) {
        if (obj2[key] !== obj1[key]) {
            return false
        }
    }
    
    return true
  }
}

// 字符串相乘
function multiply(num1, num2) {
  if(num1.charAt(0) == 0 || num2.charAt(0) == 0) {
      return '0'
  }
  var a, b, c
  if (num1.length >= num2.length) {
      a = num1.split('')
      b = num2.split('')
  } else {
      a = num2.split('')
      b = num1.split('')
  }
  a = a.reverse()
  b = b.reverse()
  c = []  
  for (let k = 0; k < a.length + b.length; k++) {
      c[k] = 0
  }
  for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length ; j++) {
          c[i+j] += a[i]*b[j]
      }
  }
  
  for (let m = 0; m < c.length; m++) {
      if (c[m] > 9) {
          c[m+1] += Math.floor(c[m] / 10)
          c[m] = c[m]%10
      }
  }
  
  c = c.reverse()
  
  for (let n = 0; n < 1; n++) {
      if(c[n] == 0) { 
          c.splice(0, 1)
          n--
      }
      return c.join('')
  }
}

// 复原ip地址
function restoreIpAddresses(s) {
  function regular(s) {
    if (!s.length) return false
    return 0 <= +s && +s <= 255 && (s.length > 1 ? !!+s[0] : true)
  }
  
  function fn(remain, temp, result) {
    if (temp.length === 3) {
      regular(remain) && result.push([...temp, remain].join('.'))
      return
    }
    for (let i = 1; i < 4; i++) {
      regular(remain.substr(0, i)) && fn(remain.substr(i), [...temp, remain.substr(0, i)], result)
    }
  }

  if (s.length > 12) return []
  let result = []
  fn(s, [], result)
  return result
}