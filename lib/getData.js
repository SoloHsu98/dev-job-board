import React from "react";

export async function getJobs(prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}
export async function getJob(id, prisma) {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return job;
}

export async function getUser(id, prisma) {
  const company = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return company;
}
export async function getCompanyJobs(companyId, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
      authorId: companyId,
    },
    include: {
      author: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}

export async function getJobsPosted(userId, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
      applications: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}

export async function getUserApplications(userId, prisma) {
  const applications = await prisma.application.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: true,
      job: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return applications;
}

export async function checkAlreadyApplied(userId, jobId, prisma) {
  const applications = await prisma.application.findMany({
    where: { jobId: parseInt(jobId) },
    include: {
      author: true,
      job: true,
    },
  });

  if (applications.length > 0) {
    return true;
  }
  return false;
}

export async function getCategories(prisma) {
  const categories = await prisma.category.findMany({
    include: {
      jobs: true,
    },
  });
  return categories;
}

export async function getJobsByCategory(categoryId, prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
      categoryId: parseInt(categoryId),
    },
    include: {
      author: true,
      category: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return jobs;
}
