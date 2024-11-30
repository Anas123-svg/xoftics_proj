import React from "react";

interface TaskOverviewProps {
  filteredTasks: any[];
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ filteredTasks }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-300 mb-4 m-10">Task Overview</h2>
      <div className="grid grid-cols-3 gap-6 m-10">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-teal-900 p-4 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold">{task.name}</h3>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOverview;
