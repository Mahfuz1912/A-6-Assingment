# JavaScript Questions

---

### 1) What is the difference between `null` and `undefined`?

**Answer:**

- **`undefined`** → কোনো ভ্যারিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু এখনো কোনো মান দেওয়া হয়নি। তখন JS নিজে থেকে এটাকে `undefined` সেট করে।

- **`null`** → ইচ্ছাকৃতভাবে দেওয়া একটি খালি মান। ডেভেলপার নিজে থেকে বলে দেয় যে এখানে কোনো মান নেই।

---

### 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

**Answer:**

- **`map()`** → একটা নতুন Array return করে। কোন Array কে map করলে ওই Array এর প্রত্যেকটা উপাদান নিয়ে আলাদা আলাদা Array তৈরী করে।

- **`forEach()`** → Array এর প্রতিটা element এর উপর কাজ করে কিন্তু কিছু রিটার্ন করে না।

---

### 3) What is the difference between `==` and `===`?

**Answer:**

- **`==`** → Type conversion করে (শুধু value compare করে)
- **`===`** → Type conversion করে না (value + type দুটোই compare করে)

---

### 4) What is the significance of `async`/`await` in fetching API data?

**Answer:**

API থেকে ডাটা fetch করার জন্য `async` & `await` খুবই গুরুত্বপূর্ণ ভূমিকা পালন করে:

- `async` ফাংশন এ `try`, `catch`, `finally` দিয়ে error handling করা যায় খুব সহজে
- কোড পড়া সহজ হয়
- Promise chaining এড়ানো যায়

---

### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

**Answer:**

- **Global Scope:** যে Variable ফাংশন এর বাইরে ডিক্লেয়ার করা হয় সেটা Global Scope। এটা পুরো প্রোগ্রাম এর যে কোন জায়গা থেকে এক্সেস করা যায়।

- **Function Scope:** যে Variable ফাংশন এর মধ্যে `var` দিয়ে ডিক্লেয়ার করা হয়, ওটা Function এর বাইরে এক্সেস পাওয়া যায় না।

- **Block Scope:** `{}` ব্লকের ভিতরে `let`/`const` দিয়ে ডিক্লেয়ার করা Variable শুধু ওই ব্লকেই কাজ করবে।
