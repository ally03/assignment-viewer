export function getAllAssignments() {
    return fetch(
        // 'https://httpstat.us/404'
        "https://beehiveapi.lionhearttrust.org.uk/v3.5/planner/test/assignments?pageIndex=0&pageSize=30"
    );
}

export function getAllAssignmentsDetails(id) {
    return fetch(
        // "https://beehiveapi.lionhearttrust.org.uk/v3.5/planner/users/d70cbe8d-11ac-e811-80e2-005056a23846/assignments/195212313"
        `https://beehiveapi.lionhearttrust.org.uk/v3.5/planner/users/d70cbe8d-11ac-e811-80e2-005056a23846/assignments/${id}`
    );
}
