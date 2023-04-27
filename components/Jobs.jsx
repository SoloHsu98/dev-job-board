import React from "react";
import Job from "./Job";
export function Jobs({ jobs }) {
  return (
    <section className="flex flex-col gap-4 mt-4">
      {jobs.map((job) => (
        <Job job={job} key={job.id} />
      ))}
    </section>
  );
}
