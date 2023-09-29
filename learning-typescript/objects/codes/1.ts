{
  type WithFirstName = {
    firstName: string;
  };

  type WithLastName = {
    lastName: string;
  };

  const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
  };

  let withFirstName: WithFirstName = hasBoth;

  let withLastName: WithLastName = hasBoth;
}
