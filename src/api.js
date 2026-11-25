export function getAuthToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("taskflow_token") ||
    localStorage.getItem("authToken")
  );
}

export async function api(path, options = {}) {
  const token = getAuthToken();
  const headers = { ...(options.headers || {}) };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed (${response.status})`);
  }

  return data;
}
