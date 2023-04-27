import { Button } from "@tremor/react";
import axios from "axios";
import React from "react";

const tasks = [
  {
    label: "Clean database",
    type: "clean_database",
  },

  {
    label: "Generate 10 Users & Jobs",
    type: "generate_users_jobs",
  },
  {
    label: "Generate 1 Job",
    type: "generate_one_job",
  },
];
export default function utils() {
  return (
    <section className="container mx-auto mt-10">
      <h2 className="mb-10 text-4xl font-bold text-center">Data generation</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {tasks.map((task) => (
          <Button
            onClick={async () => {
              await axios.post("api/utils", {
                task: task.type,
              });
            }}
            color="indigo"
            key={task.type}
          >
            {task.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
