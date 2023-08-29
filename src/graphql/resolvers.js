import tasksService from "../service/TasksService.js";

export const resolvers = {
  Query: {
    getTodoTasks: async (parent, args, { userId }) => {
      return await tasksService.findAll(userId);
    },
    getDoneTasks: async (parent, args, { userId }) => {
      return await tasksService.findDone(userId);
    },
    getTask: async (parent, { id }) => {
      return await tasksService.findById(id);
    },
    findTasks: async (parent) => {},
  },
  Mutation: {
    createTask: async (
      parent,
      { task: { title, description } },
      { userId }
    ) => {
      return await tasksService.save({ title, description, userId });
    },
    updateTask: async (
      parent,
      { id, task: { title, description, done } },
      { userId }
    ) => {
      const updatedTask = await tasksService.update(
        id,
        title,
        description,
        done,
        userId
      );
      return updatedTask;
    },
    deleteTask: async (parent, { id }, { userId }) => {
      await tasksService.delete(id, userId);
      return true;
    },
  },
};
