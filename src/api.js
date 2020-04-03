export async function getAllAssignments() {
  const response = await fetch(
    "https://beehiveapi.lionhearttrust.org.uk/v3.5/planner/test/assignments?pageIndex=0&pageSize=30"
  );
  return response.json();
}
