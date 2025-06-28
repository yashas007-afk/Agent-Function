import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskPage() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/agents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(res.data);
    } catch (err) {
      console.error('Failed to load agents');
    }
  };

  const fetchTasks = async (agentId) => {
    try {
      const res = await axios.get(`http://localhost:5050/api/tasks/agent/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks);
      setSelectedAgent(agentId);
    } catch (err) {
      console.error('Failed to fetch tasks');
    }
  };

  return (
    <div>
      <h2>Tasks by Agent</h2>

      <div>
        <label>Select Agent: </label>
        <select onChange={(e) => fetchTasks(e.target.value)} defaultValue="">
          <option value="" disabled>Select one</option>
          {agents.map(agent => (
            <option key={agent._id} value={agent._id}>
              {agent.name} – {agent.email}
            </option>
          ))}
        </select>
      </div>

      <hr />

      {tasks.length > 0 ? (
        <>
          <h3>Tasks for selected agent:</h3>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <strong>{task.firstName}</strong> – {task.phone} <br />
                Notes: {task.notes}
              </li>
            ))}
          </ul>
        </>
      ) : (
        selectedAgent && <p>No tasks found for this agent.</p>
      )}
    </div>
  );
}

export default TaskPage;
