enum UserRole {
  Owner = "admin",
  Server = "waiter",
  Chef = "cook",
  Customer = "user",
}

export const userList = [
  {
   label: "Owner",
    value: UserRole.Owner,
  },
  {
   label: "Server",
    value: UserRole.Server,
  },
  {
    label: "Chef",
    value: UserRole.Chef,
  },
  {
    label: "Customer",
    value: UserRole.Customer,
  },
];
