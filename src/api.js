export async function getAllAssignments() {
  const response = await fetch(
    "https://beehiveapi.lionhearttrust.org.uk/v3.5/planner/test/assignments?pageIndex=0&pageSize=30"
  );
  return response.json();
}

export async function getAllAssignmentsDetails(id) {
  console.log(id, "this is idd");
  const response = await fetch(
    `https://beehiveapi.lionhearttrust.org.uk/v3.5/planner/users/d70cbe8d-11ac-e811-80e2-005056a23846/assignments/${id}`
  );
  return response.json();
}
