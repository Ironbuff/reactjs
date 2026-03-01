enum UserRole {
  Owner = "admin",
  Server = "waiter",
  Chef = "cook",
  Customer = "user",
}

export const userList = [
  {
    id: "Owner",
    value: UserRole.Owner,
  },
  {
    id: "Server",
    value: UserRole.Server,
  },
  {
    id: "Chef",
    value: UserRole.Chef,
  },
  {
    id: "Customer",
    value: UserRole.Customer,
  },
];
