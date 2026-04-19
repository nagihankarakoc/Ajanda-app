export const createTask = (text, date, priority, category) => ({
  id: Date.now(),
  text,
  date,
  priority,
  category,
  done: false
});