const {
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/employees");
const { app } = require("../index");
const request = require("supertest");
const http = require("http");

jest.mock("../controllers/employees", () => ({
  ...jest.requireActual("../controllers/employees"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(4000);
});

afterAll(async () => {
  server.close();
});

describe("Controllers functions test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all employees", async () => {
    const employees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(employees);

    const result = await getAllEmployees();
    expect(result).toEqual(employees);
    expect(result.length).toBe(3);
  });

  it("should return employee by id", async () => {
    const empById = {
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    };
    getEmployeeById.mockReturnValue(empById);

    const result = await getEmployeeById(empById);
    expect(result).toEqual(empById);
  });
});

describe("API Endpoints test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /employees should get all employees", async () => {
    const result = await request(server).get("/employees");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
  });

  it("GET /employees/details should return employee by id", async () => {
    const res = await request(server).get("/employees/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
