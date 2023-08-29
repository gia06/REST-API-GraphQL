import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `
  type Query {
    getTodoTasks: [Task]! 
    getDoneTasks: [Task]! 
    getTask(id: ID!): Task 
    findTasks(tags: [String]!): [Task]! 
  }

  type Mutation { 
    createTask(task: CreateTaskInput!): Task! 
    updateTask(id: ID!, task: UpdateTaskInput!): Task! 
    deleteTask(id: ID!): Boolean 
  }

  type Task { 
    title: String! 
    description: String!
    done: Boolean! 
  }

  input CreateTaskInput { 
    title: String! 
    description: String! 
  }

  input UpdateTaskInput { 
    title: String!
    description: String! 
    done: Boolean! 
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
