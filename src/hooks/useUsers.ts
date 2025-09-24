import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profit: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: "#6548",
          name: "John Doe",
          email: "john@example.com",
          role: "Surrogate",
          status: "Pending",
          profit: "$154"
        },
        // Add more mock users as needed
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { users, loading };
}