import { Response, Request } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// Define user interface
interface IUser {
  id: string;
  name: string;
  age: number;
}
// Define user's collection
const users = new Map<string, IUser>();
users.set(
  "1",
  { id: "563013a3-7a70-4370-9722-fb174c880a7c", name: "John Doe", age: 18 },
);
users.set(
  "2",
  { id: "54470cd6-6e62-45eb-bff8-c048646d3f5f", name: "Jane Doe", age: 19 },
);
users.set(
  "3",
  {
    id: "ba65ee92-3366-48fb-893d-2bd2c0d8f21f",
    name: "Peter Griffin",
    age: 45,
  },
);

// Define controller's methods
export const createUsers = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body: any = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Where is the body?",
    };
  } else {
    const values = await body.value;
    const newUser: IUser = {
      id: v4.generate(),
      name: values.name,
      age: values.age,
    };

    users.set((users.size + 1).toString(), newUser);

    response.status = 200;
    response.body = {
      message: `New user registered ${newUser.name}`,
    };
  }
};

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "Successful Query",
    users: Array.from(users.values()),
  };
};

export const getUser = (
  { response, params }: { response: Response; params: { id: string } },
) => {
  const user = users.get(params.id);
  if (user) {
    response.body = {
      message: "Successful Query",
      user,
    };
  } else {
    response.body = {
      message: "User not found",
    };
  }
};

export const updateUsers = async (
  { request, response, params }: {
    request: Request;
    response: Response;
    params: { id: string };
  },
) => {
  const user = users.get(params.id);
  if (!user) {
    response.status = 404;
    response.body = {
      message: 'user not found'
    }
  }
  else {
    const body = await request.body();
    const updateUser: any = await body.value;

    Object.assign(user, {...updateUser} );
    response.status = 200;
    response.body = {
      message: 'user updated',
      user
    }
  }
};

export const deleteUsers = (
  { response, params }: { response: Response; params: { id: string } },
) => {
  const result = users.delete(params.id);
  if (result) {
    response.body = {
      message: "user deleted",
    };
  } else {
    response.body = {
      message: "User not found",
    };
  }
};
